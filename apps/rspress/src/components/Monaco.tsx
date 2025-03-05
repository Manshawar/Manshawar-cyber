import { Editor } from '@monaco-editor/react';
import { useState, useRef, useCallback ,useEffect} from 'react';

interface MonacoProps {
  value?: string;
  language?: string;
  theme?: string;
  height?: string | number;
  width?: string | number;
  onChange?: (value: string | undefined) => void;
  onRun?: (code: string) => void;
}

interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: number;
}

export default function Monaco({
  value = '',
  language = 'javascript',
  theme = 'vs-dark',
  height = '500px',
  width = '100%',
  onChange,
  onRun,
  ...props
}: MonacoProps) {
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
 
  const editorRef = useRef<any>(null);

  // 创建一个包装后的 console 方法
  const createWrappedConsole = useCallback((type: ConsoleLog['type']) => {
    return (...args: any[]) => {
  
      const content = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');

      setLogs(prev => [...prev, {
        type,
        content,
        timestamp: Date.now()
      }]);
     
      // 同时在原始控制台输出
      const originalConsole = (window as any).originalConsole;
      if (originalConsole && originalConsole[type]) {
        originalConsole[type](...args);
      }
    };
  }, []);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const executeCode = async (code: string) => {
    return new Promise((resolve, reject) => {
      try {
        // 创建包装函数的代码
        const functionBody = `
          let timeoutIds = [];
          let intervalIds = [];
          
          // 重写定时器函数以跟踪ID
          const originalSetTimeout = window.setTimeout;
          const originalSetInterval = window.setInterval;
          
          window.setTimeout = (...args) => {
            const id = originalSetTimeout(...args);
            timeoutIds.push(id);
         
            const index = timeoutIds.indexOf(id);
            const originalCallback = args[0];
            args[0] = (...cbArgs) => {
              timeoutIds.splice(index, 1);
              return originalCallback(...cbArgs);
            };
            return id;
          };
          
          window.setInterval = (...args) => {
            const id = originalSetInterval(...args);
            intervalIds.push(id);
            return id;
          };

          try {
            ${code}
          } catch (error) {
            console.error(error instanceof Error ? error.message : String(error));
          }

          // 返回一个 Promise，等待所有计时器完成
          return new Promise(resolve => {
            const checkTimeouts = () => {
           
              // 保存当前的定时器数量，避免在检查过程中创建新的定时器
              const currentTimeouts = [...timeoutIds];
              if (timeoutIds.length > 0) {
                // 检查是否所有当前定时器都已完成
                const allCompleted = currentTimeouts.every(id => !timeoutIds.includes(id));
                if (allCompleted) {
                  // 清理所有interval
                  intervalIds.forEach(id => clearInterval(id));
                  // 恢复原始的定时器函数
                  window.setTimeout = originalSetTimeout;
                  window.setInterval = originalSetInterval;
                  resolve();
                } else {
                  originalSetTimeout(checkTimeouts, 100);
                }
              } else {
                // 清理所有interval
                intervalIds.forEach(id => clearInterval(id));
                // 恢复原始的定时器函数
                window.setTimeout = originalSetTimeout;
                window.setInterval = originalSetInterval;
                resolve();
              }
            };
            checkTimeouts();
          });
        `;
     
        // 创建异步函数
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const fn = new AsyncFunction(functionBody);
        
        // 执行函数
        fn()
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  };
 
  const handleRunCode = async () => {
    if (!editorRef.current ) return;
    
    const code = editorRef.current.getValue();
    setLogs([]); // 清空之前的输出
  

    // 保存原始的 console 方法
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };

    // 保存到 window 对象以供异步访问
    (window as any).originalConsole = originalConsole;

    // 重写 console 方法
    console.log = createWrappedConsole('log');
    console.error = createWrappedConsole('error');
    console.warn = createWrappedConsole('warn');
    console.info = createWrappedConsole('info');

    try {
      await executeCode(code);
      if (onRun) {
        onRun(code);
        
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    } finally {
      // 恢复原始 console
      Object.assign(console, originalConsole);
      // 重置运行状态
    
 
    }
  };

  const clearConsole = () => {
    setLogs([]);
  };

  return (
    <div className="flex w-full h-full min-h-[500px] bg-[#1e1e1e] text-white rounded-lg overflow-hidden border border-[#333]">
      {/* 代码编辑区 */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end items-center px-3 py-2 bg-[#252526] border-b border-[#333]">
          <button
            onClick={handleRunCode}
            
            className={`px-3 py-1 text-white text-sm rounded transition-colors ${
           
                 'bg-[#0098ff] hover:bg-[#0082db]'
            }`}
          >
            运行
          </button>
        </div>
        <div className="flex-1">
          <Editor
            height="100%"
            defaultValue={value}
            defaultLanguage={language}
            theme={theme}
            onChange={onChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              roundedSelection: false,
              padding: { top: 10 },
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on'
            }}
            {...props}
          />
        </div>
      </div>

      {/* 控制台输出区 */}
      <div className="w-[40%] border-l border-[#333] flex flex-col">
        <div className="flex justify-between items-center px-3 py-2 bg-[#252526] border-b border-[#333]">
          <span className="text-sm text-[#ccc]">控制台</span>
          <button
            onClick={clearConsole}
            className="px-3 py-1 bg-[#333] text-white text-sm rounded hover:bg-[#444] transition-colors"
          >
            清除
          </button>
        </div>
        <div className="flex-1 overflow-auto p-2 font-mono text-sm">
          {logs.map((log, index) => (
            <div
              key={log.timestamp + '-' + index}
              className={`py-1 border-b border-[#333] whitespace-pre-wrap ${
                log.type === 'error' ? 'text-[#ff5555]' :
                log.type === 'warn' ? 'text-[#ffb86c]' :
                log.type === 'info' ? 'text-[#8be9fd]' : 'text-[#f8f8f2]'
              }`}
            >
              {log.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function formatCode(fn:Function){
  let fnName = fn.name;
  return   fn.toString()+"\n"+fnName+"()"
}