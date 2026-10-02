use std::process::Command;
use std::time::{SystemTime, UNIX_EPOCH};

#[tauri::command]
async fn generate_audio(text: String, voice: String, rate: String, pitch: String, volume: String) -> Result<String, String> {
    let local_appdata = std::env::var("LOCALAPPDATA").unwrap_or_else(|_| String::from(r#"C:\AppData"#));
    let default_path = format!(r#"{}\Python\pythoncore-3.14-64\Scripts\edge-tts.exe"#, local_appdata);
    let edge_tts_path = if std::path::Path::new(default_path).exists() {
        default_path
    } else {
        "edge-tts"
    };
    
    // Generate unique filename in Downloads
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards");
    let user_profile = std::env::var("USERPROFILE").unwrap_or_else(|_| String::from(r#"C:\Users\Default"#));
    let filename = format!(r#"{}\Downloads\audio_{}.mp3"#, user_profile, since_the_epoch.as_secs());

    let output = Command::new(edge_tts_path)
        .arg("--text")
        .arg(&text)
        .arg("--voice")
        .arg(&voice)
        .arg("--rate")
        .arg(&rate)
        .arg("--pitch")
        .arg(&pitch)
        .arg("--volume")
        .arg(&volume)
        .arg("--write-media")
        .arg(&filename)
        .output()
        .map_err(|e| format!("Error ejecutando edge-tts: {}", e))?;

    if output.status.success() {
        Ok(filename)
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        Err(format!("Error del motor: {}", stderr))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![generate_audio])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
