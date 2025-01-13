use tauri::{generate_context, AppHandle, Emitter};
#[tauri::command]
pub fn test(app: AppHandle) {
    println!("download started");
    app.emit("download-started", "haha").unwrap();
}
