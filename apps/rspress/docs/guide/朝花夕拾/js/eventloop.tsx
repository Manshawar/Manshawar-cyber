import {useEffect,useRef} from "react"
import Editor, {formatCode} from '@/components/Monaco';
export default function EventLoop(){
 


  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  return (
    <div>

      <Editor
      value={` function eventLoop(){
    new Promise((resolve,reject)=>{
      setTimeout(()=>{
      console.log("1")
      },1000)
      resolve("")
    }).then(()=>{
      console.log("2")
    })
    console.log("end")
   
  }
     eventLoop()
  `}
      />
    </div>
  )
}