import { invoke } from "@tauri-apps/api/core";
import "./styles.css";

let textInput: HTMLTextAreaElement;
let voiceSelect: HTMLSelectElement;
let rateSlider: HTMLInputElement;
let rateValue: HTMLElement;
let pitchSlider: HTMLInputElement;
let pitchValue: HTMLElement;
let volumeSlider: HTMLInputElement;
let volumeValue: HTMLElement;
let generateBtn: HTMLButtonElement;
let statusText: HTMLElement;

async function generateAudio() {
  const text = textInput.value.trim();
  if (!text) {
    showStatus("Error: El texto está vacío.", true);
    return;
  }

  const voice = voiceSelect.value;
  const rate = parseInt(rateSlider.value) >= 0 ? `+${rateSlider.value}%` : `${rateSlider.value}%`;
  const pitch = parseInt(pitchSlider.value) >= 0 ? `+${pitchSlider.value}Hz` : `${pitchSlider.value}Hz`;
  const volume = parseInt(volumeSlider.value) >= 0 ? `+${volumeSlider.value}%` : `${volumeSlider.value}%`;

  generateBtn.disabled = true;
  generateBtn.innerHTML = `<svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generando...`;

  showStatus("Llamando al motor Rust y edge-tts...", false);

  try {
    const result = await invoke("generate_audio", { text, voice, rate, pitch, volume });
    showStatus(`✅ Éxito: Guardado en ${result}`, false);
  } catch (error) {
    showStatus(`❌ Error: ${error}`, true);
  } finally {
    generateBtn.disabled = false;
    generateBtn.innerHTML = `<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div><span class="relative z-10 flex justify-center items-center gap-2"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Sintetizar Audio</span>`;
  }
}

function showStatus(message: string, isError: boolean) {
  statusText.innerHTML = `<span class="animate-pulse">_</span> ${message}`;

  if (isError) {
    statusText.className = "text-red-400 flex items-center gap-2";
  } else if (message.includes("✅")) {
    statusText.className = "text-primary flex items-center gap-2";
  } else {
    statusText.className = "text-primary/80 flex items-center gap-2";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  textInput = document.getElementById("text-input") as HTMLTextAreaElement;
  voiceSelect = document.getElementById("voice-select") as HTMLSelectElement;
  rateSlider = document.getElementById("rate-slider") as HTMLInputElement;
  rateValue = document.getElementById("rate-value") as HTMLElement;
  pitchSlider = document.getElementById("pitch-slider") as HTMLInputElement;
  pitchValue = document.getElementById("pitch-value") as HTMLElement;
  volumeSlider = document.getElementById("volume-slider") as HTMLInputElement;
  volumeValue = document.getElementById("volume-value") as HTMLElement;
  generateBtn = document.getElementById("generate-btn") as HTMLButtonElement;
  statusText = document.getElementById("status-text") as HTMLElement;

  rateSlider.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    rateValue.textContent = parseInt(val) >= 0 ? `+${val}%` : `${val}%`;
  });

  pitchSlider.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    pitchValue.textContent = parseInt(val) >= 0 ? `+${val}Hz` : `${val}Hz`;
  });

  volumeSlider.addEventListener("input", (e) => {
    const val = (e.target as HTMLInputElement).value;
    volumeValue.textContent = parseInt(val) >= 0 ? `+${val}%` : `${val}%`;
  });

  generateBtn.addEventListener("click", generateAudio);
});
