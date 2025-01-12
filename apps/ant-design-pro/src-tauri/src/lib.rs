use tauri::{AppHandle, Emitter};
#[tauri::command]
fn download(app: AppHandle) {
    // 发送下载开始事件
    println!("download started");
    app.emit("download-started", "haha").unwrap();

    // 模拟下载进度
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![download])
        .setup(|app| {
            if cfg!(debug_assertions) {
                println!("Running in debug mode");

                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
