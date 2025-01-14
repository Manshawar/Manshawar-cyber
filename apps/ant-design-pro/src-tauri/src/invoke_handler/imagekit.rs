use imagekit::delete::Delete;
use imagekit::upload::types::FileType;
use imagekit::upload::{Options, Upload, UploadFile};
use imagekit::ImageKit;
use tauri::{generate_context, App, AppHandle, Emitter};
use tokio::fs::File;
use tokio::io::AsyncWriteExt;

#[tauri::command]
pub fn test(msg: Vec<u8>) -> String {
    if let Ok(value) = get_image(msg) {
        return value;
    } else {
        return "Error".to_string();
    }
}
#[tokio::main]
async fn get_image(msg: Vec<u8>) -> Result<String, std::io::Error> {
    let temp_file_path = "temp_image.png";

    // 写入文件
    {
        let mut file = File::create(&temp_file_path).await?;
        file.write_all(&msg).await?;
    } // 文件在这里自动关闭

    // 打开临时文件
    let file = File::open(&temp_file_path).await?;

    // 初始化 ImageKit
    let image_kit = ImageKit::new(
        "public_f0lEErwJhjlt4SJMaHwZjt0aJ",
        "private_n30SXnhlaw6R02EZak+dIt4dOmU=",
        "https://ik.imagekit.io/Manshawar",
    );

    // 上传文件
    let opts = Options::new(UploadFile::Binary(file), "ferris");
    let upload_result = image_kit.upload(opts).await.map_err(|e| {
        std::io::Error::new(std::io::ErrorKind::Other, format!("Upload failed: {}", e))
    })?;

    // 删除临时文件
    tokio::fs::remove_file(&temp_file_path).await?;

    // 返回上传结果的 URL
    Ok(upload_result.url)
    // 2. 打开临时文件
    // let file = File::open(temp_file_path).await.map_err(|e| e.to_string());

    // let mut image_kit = ImageKit::new(
    //     "public_f0lEErwJhjlt4SJMaHwZjt0aJ",
    //     "private_n30SXnhlaw6R02EZak+dIt4dOmU=",
    //     "https://ik.imagekit.io/Manshawar",
    // );
    // // let file: File = File::open("LonelyCAT.png").await.unwrap();

    // let opts = Options::new(UploadFile::Binary(file.expect("err")), "ferris");
    // let upload_result: imagekit::upload::types::Response = image_kit.upload(opts).await.unwrap();

    // let mut file = File::create("test").await?;
    // file.write_all(&data).await?;
    // let res = UploadFile::from(file);
    // let opts = Options::new(res, "ferris");
    // let upload_result = image_kit.upload(opts).await.unwrap();
    // Ok((upload_result).url)
}
