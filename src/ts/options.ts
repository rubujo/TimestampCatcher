"enable strict";

import { Function, PlaylistType } from "./function";

let elemEnableOutputLog: HTMLInputElement | null = null;
let elemEnableSoundEffect: HTMLInputElement | null = null;
let elemEnableFormattedYTTimestamp: HTMLInputElement | null = null;
let elemEnableYTUtaWakuMode: HTMLInputElement | null = null;
let elemEnableLegacyKeyListener: HTMLInputElement | null = null;
let elemEnableLeftSideSpacePadding: HTMLInputElement | null = null;
let elemEnableAppendingStartEndToken: HTMLInputElement | null = null;
let elemSelectMIME: HTMLSelectElement | null = null;
let elemEnableAddAniGamerDanMu: HTMLInputElement | null = null;
let elemSelExportType: HTMLSelectElement | null = null;
let elemBtnExport: HTMLButtonElement | null = null;
let elemBtnDownloadLocalVideoPlayer: HTMLAnchorElement | null = null;

document.addEventListener("DOMContentLoaded", () => {
    document.onreadystatechange = () => {
        if (document.readyState === "complete") {
            Function.initExtension();

            initOptionsGlobalVariables();

            loadOptionsUIi18n();

            registerOptionsListenEvent();

            const timer = setTimeout(function () {
                loadOptionsData();

                clearTimeout(timer);
            }, Function.CommonTimeout);
        }
    };
});

/**
 * 初始化全域變數
 */
function initOptionsGlobalVariables(): void {
    elemEnableOutputLog = document.getElementById("enableOutputLog") as HTMLInputElement;
    elemEnableSoundEffect = document.getElementById("enableSoundEffect") as HTMLInputElement;
    elemEnableFormattedYTTimestamp = document.getElementById("enableFormattedYTTimestamp") as HTMLInputElement;
    elemEnableYTUtaWakuMode = document.getElementById("enableYTUtaWakuMode") as HTMLInputElement;
    elemEnableLegacyKeyListener = document.getElementById("enableLegacyKeyListener") as HTMLInputElement;
    elemEnableLeftSideSpacePadding = document.getElementById("enableLeftSideSpacePadding") as HTMLInputElement;
    elemEnableAppendingStartEndToken = document.getElementById("enableAppendingStartEndToken") as HTMLInputElement;
    elemSelectMIME = document.getElementById("selectMIME") as HTMLSelectElement;
    elemEnableAddAniGamerDanMu = document.getElementById("enableAddAniGamerDanMu") as HTMLInputElement;
    elemSelExportType = document.getElementById("selExportType") as HTMLSelectElement;
    elemBtnExport = document.getElementById("btnExport") as HTMLButtonElement;
    elemBtnDownloadLocalVideoPlayer = document.getElementById("btnDownloadLocalVideoPlayer") as HTMLAnchorElement;
}

/**
 * 載入 UI 的 i18n 字串
 */
function loadOptionsUIi18n(): void {
    document.title = chrome.i18n.getMessage("appName");

    const elemEnableOutputLogLabel = document.getElementById("enableOutputLogLabel");

    if (elemEnableOutputLogLabel !== null) {
        elemEnableOutputLogLabel.textContent = chrome.i18n.getMessage("stringEnableOutputLogLabel");
    }

    const elemEnableSoundEffectLabel = document.getElementById("enableSoundEffectLabel");

    if (elemEnableSoundEffectLabel !== null) {
        elemEnableSoundEffectLabel.textContent = chrome.i18n.getMessage("stringEnableSoundEffectLabel");
    }

    const elemEnableFormattedYTTimestampLabel = document.getElementById("enableFormattedYTTimestampLabel");

    if (elemEnableFormattedYTTimestampLabel !== null) {
        elemEnableFormattedYTTimestampLabel.textContent = chrome.i18n.getMessage("stringEnableFormattedYTTimestampLabel");
    }

    const elemEnableYTUtaWakuModeLabel = document.getElementById("enableYTUtaWakuModeLabel");

    if (elemEnableYTUtaWakuModeLabel !== null) {
        elemEnableYTUtaWakuModeLabel.textContent = chrome.i18n.getMessage("stringEnableYTUtaWakuModeLabel");
    }

    const elemelemEnableLegacyKeyListenerLabel = document.getElementById("enableLegacyKeyListenerLabel");

    if (elemelemEnableLegacyKeyListenerLabel !== null) {
        elemelemEnableLegacyKeyListenerLabel.textContent = chrome.i18n.getMessage("stringEnableLegacyKeyListenerLabel");
    }

    const enableLeftSideSpacePaddingLabel = document.getElementById("enableLeftSideSpacePaddingLabel");

    if (enableLeftSideSpacePaddingLabel !== null) {
        enableLeftSideSpacePaddingLabel.textContent = chrome.i18n.getMessage("stringEnableLeftSideSpacePaddingLabel");
    }

    const enableAppendingStartEndTokenLabel = document.getElementById("enableAppendingStartEndTokenLabel");

    if (enableAppendingStartEndTokenLabel !== null) {
        enableAppendingStartEndTokenLabel.textContent = chrome.i18n.getMessage("stringEnableAppendingStartEndTokenLabel");
    }

    const elemOutputFormat = document.getElementById("outputFormat");

    if (elemOutputFormat !== null) {
        elemOutputFormat.textContent = chrome.i18n.getMessage("stringOutputFormat");
    }

    const elemEnableAddAniGamerDanMuLabel = document.getElementById("enableAddAniGamerDanMuLabel");

    if (elemEnableAddAniGamerDanMuLabel !== null) {
        elemEnableAddAniGamerDanMuLabel.textContent = chrome.i18n.getMessage("stringEnableAddAniGamerDanMuLabel");
    }

    if (elemSelExportType !== null) {
        elemSelExportType.title = chrome.i18n.getMessage("stringSelExportType");
    }

    const elemOptTimestamp = document.getElementById("optTimestamp");

    if (elemOptTimestamp !== null) {
        elemOptTimestamp.textContent = chrome.i18n.getMessage("stringOptTimestamp");
    }

    const elemOptYtComment = document.getElementById("optYtComment");

    if (elemOptYtComment !== null) {
        elemOptYtComment.textContent = chrome.i18n.getMessage("stringOptYtComment");
    }

    const elemOptYtTimestampUrls = document.getElementById("optYtTimestampUrls");

    if (elemOptYtTimestampUrls !== null) {
        elemOptYtTimestampUrls.textContent = chrome.i18n.getMessage("stringOptYtTimestampUrls");
    }

    const elemOptCustomYTPlayerPlaylist_Timestamps = document.getElementById("optCustomYTPlayerPlaylist_Timestamps");

    if (elemOptCustomYTPlayerPlaylist_Timestamps !== null) {
        elemOptCustomYTPlayerPlaylist_Timestamps.textContent = chrome.i18n.getMessage("stringOptCustomYTPlayerPlaylist_Timestamps");
    }

    const elemOptCustomYTPlayerPlaylist_Seconds = document.getElementById("optCustomYTPlayerPlaylist_Seconds");

    if (elemOptCustomYTPlayerPlaylist_Seconds !== null) {
        elemOptCustomYTPlayerPlaylist_Seconds.textContent = chrome.i18n.getMessage("stringOptCustomYTPlayerPlaylist_Seconds");
    }

    const elemOptJsoncPlaylist = document.getElementById("optJsoncPlaylist");

    if (elemOptJsoncPlaylist !== null) {
        elemOptJsoncPlaylist.textContent = chrome.i18n.getMessage("stringOptJsoncPlaylist");
    }

    const elemOptCueSheet = document.getElementById("optCueSheet");

    if (elemOptCueSheet !== null) {
        elemOptCueSheet.textContent = chrome.i18n.getMessage("stringOptCueSheet");
    }

    if (elemBtnExport !== null) {
        elemBtnExport.textContent = chrome.i18n.getMessage("stringBtnExport");
        elemBtnExport.title = chrome.i18n.getMessage("stringBtnExport");
    }

    if (elemBtnDownloadLocalVideoPlayer !== null) {
        elemBtnDownloadLocalVideoPlayer.textContent = chrome.i18n.getMessage("stringBtnDownloadLocalVideoPlayer");
        elemBtnDownloadLocalVideoPlayer.title = chrome.i18n.getMessage("stringBtnDownloadLocalVideoPlayer");
    }
}

/**
 * 註冊監聽事件
 */
function registerOptionsListenEvent(): void {
    elemEnableOutputLog?.addEventListener("change", (event) => {
        const elem = event.currentTarget as HTMLInputElement;

        chrome.storage.sync.set({ "EnableOutputLog": elem.checked }, () => {
            if (chrome.runtime.lastError?.message) {
                Function.writeConsoleLog(chrome.runtime.lastError?.message);

                alert(chrome.runtime.lastError?.message);
            } else {
                Function.playBeep(0);

                Function.writeConsoleLog(chrome.i18n.getMessage("messageSettingsSaved"));

                alert(chrome.i18n.getMessage("messageSettingsSaved"));
            }
        });
    });

    elemEnableSoundEffect?.addEventListener("change", (event) => {
        const elem = event.currentTarget as HTMLInputElement;

        chrome.storage.sync.set({ "EnableSoundEffect": elem.checked }, () => {
            if (chrome.runtime.lastError?.message) {
                Function.writeConsoleLog(chrome.runtime.lastError?.message);

                alert(chrome.runtime.lastError?.message);
            } else {
                Function.playBeep(0);

                Function.writeConsoleLog(chrome.i18n.getMessage("messageSettingsSaved"));

                alert(chrome.i18n.getMessage("messageSettingsSaved"));
            }
        });
    });

    elemEnableFormattedYTTimestamp?.addEventListener("change", (event) => {
        const elem = event.currentTarget as HTMLInputElement;

        chrome.storage.sync.set({ "EnableFormattedYTTimestamp": elem.checked }, () => {
            if (chrome.runtime.lastError?.message) {
                Function.writeConsoleLog(chrome.runtime.lastError?.message);

                alert(chrome.runtime.lastError?.message);
            } else {
                Function.playBeep(0);

                Function.writeConsoleLog(chrome.i18n.getMessage("messageSettingsSaved"));

                alert(chrome.i18n.getMessage("messageSettingsSaved"));
            }
        });
    });

    elemEnableYTUtaWakuMode?.addEventListener("change", (event) => {
        const elem = event.currentTarget as HTMLInputElement;

        chrome.storage.sync.set({ "EnableYTUtaWakuMode": elem.checked }, () => {
            if (chrome.runtime.lastError?.message) {
                Function.writeConsoleLog(chrome.runtime.lastError?.message);

                alert(chrome.runtime.lastError?.message);
            } else {
                Function.playBeep(0);

                Function.writeConsoleLog(chrome.i18n.getMessage("messageSettingsSaved"));

                alert(chrome.i18n.getMessage("messageSettingsSaved"));
            }
        });

        Function.showYTUtaWakuMode(elem.checked);
    });

    elemEnableLegacyKeyListener?.addEventListener("change", (event) => {
        const elem = event.currentTarget as HTMLInputElement;

        chrome.storage.sync.set({ "EnableLegacyKeyListener": elem.checked }, () => {
            if (chrome.runtime.lastError?.message) {
                Function.writeConsoleLog(chrome.runtime.lastError?.message);

                alert(chrome.runtime.lastError?.message);
            } else {
                Function.playBeep(0);

                Function.writeConsoleLog(chrome.i18n.getMessage("messageSettingsSaved"));

                alert(chrome.i18n.getMessage("messageSettingsSaved"));
            }
        });
    });

    elemEnableLeftSideSpacePadding?.addEventListener("change", (event) => {
        const elem = event.currentTarget as HTMLInputElement;

        chrome.storage.sync.set({ "EnableLeftSideSpacePadding": elem.checked }, () => {
            if (chrome.runtime.lastError?.message) {
                Function.writeConsoleLog(chrome.runtime.lastError?.message);

                alert(chrome.runtime.lastError?.message);
            } else {
                Function.playBeep(0);

                Function.writeConsoleLog(chrome.i18n.getMessage("messageSettingsSaved"));

                alert(chrome.i18n.getMessage("messageSettingsSaved"));
            }
        });
    });

    elemEnableAppendingStartEndToken?.addEventListener("change", (event) => {
        const elem = event.currentTarget as HTMLInputElement;

        chrome.storage.sync.set({ "EnableAppendingStartEndToken": elem.checked }, () => {
            if (chrome.runtime.lastError?.message) {
                Function.writeConsoleLog(chrome.runtime.lastError?.message);

                alert(chrome.runtime.lastError?.message);
            } else {
                Function.playBeep(0);

                Function.writeConsoleLog(chrome.i18n.getMessage("messageSettingsSaved"));

                alert(chrome.i18n.getMessage("messageSettingsSaved"));
            }
        });
    });

    elemSelectMIME?.addEventListener("change", (event) => {
        const elem = event.currentTarget as HTMLOptionElement;

        chrome.storage.sync.set({ "MIME": elem.value }, () => {
            if (chrome.runtime.lastError?.message) {
                Function.writeConsoleLog(chrome.runtime.lastError?.message);

                alert(chrome.runtime.lastError?.message);
            } else {
                Function.playBeep(1);

                Function.writeConsoleLog(chrome.i18n.getMessage("messageSettingsSaved"));

                alert(chrome.i18n.getMessage("messageSettingsSaved"));
            }
        });
    });

    elemEnableAddAniGamerDanMu?.addEventListener("change", (event) => {
        const elem = event.currentTarget as HTMLInputElement;

        chrome.storage.sync.set({ "EnableAddAniGamerDanMu": elem.checked }, () => {
            if (chrome.runtime.lastError?.message) {
                Function.writeConsoleLog(chrome.runtime.lastError?.message);

                alert(chrome.runtime.lastError?.message);
            } else {
                Function.playBeep(0);

                Function.writeConsoleLog(chrome.i18n.getMessage("messageSettingsSaved"));

                alert(chrome.i18n.getMessage("messageSettingsSaved"));
            }
        });
    });

    elemBtnExport?.addEventListener("click", () => {
        const selectedValue = elemSelExportType?.value;

        switch (selectedValue) {
            case "Timestamp":
                Function.exportTimestamp();
                break;
            case "YtComment":
                Function.exportYtComment();
                break;
            case "YtTimestampUrls":
                Function.exportYtTimestampUrls();
                break;
            case "CustomYTPlayerPlaylist_Timestamps":
                Function.exportSpeicalFormat(false, PlaylistType.Timestamps);
                break;
            case "CustomYTPlayerPlaylist_Seconds":
                Function.exportSpeicalFormat(false, PlaylistType.Seconds);
                break;
            case "JsoncPlaylist":
                Function.exportSpeicalFormat(true, PlaylistType.Seconds);
                break;
            case "CueSheet":
                Function.exportCueSheet();
                break;
            default:
                Function.exportTimestamp();
                break;
        }
    });

    elemBtnDownloadLocalVideoPlayer?.addEventListener("click", () => {
        Function.playBeep(0);

        const tempAnchor = document.createElement("a");

        tempAnchor.download = "local_video_player.html";
        tempAnchor.href = "../html/local_video_player.html";
        tempAnchor.style.display = "none";

        document.body.appendChild(tempAnchor);

        tempAnchor.click();

        document.body.removeChild(tempAnchor);
    });
}

/**
 * 載入設定資料
 */
function loadOptionsData(): void {
    chrome.storage.sync.get([
        "EnableOutputLog",
        "EnableSoundEffect",
        "EnableFormattedYTTimestamp",
        "EnableYTUtaWakuMode",
        "EnableLegacyKeyListener",
        "EnableLeftSideSpacePadding",
        "EnableAppendingStartEndToken",
        "MIME",
        "EnableAddAniGamerDanMu"
    ], (items) => {
        if (chrome.runtime.lastError?.message) {
            Function.writeConsoleLog(chrome.runtime.lastError?.message);

            alert(chrome.runtime.lastError?.message);
        } else {
            if (elemEnableOutputLog !== null) {
                elemEnableOutputLog.checked = items.EnableOutputLog;
            }

            if (elemEnableSoundEffect !== null) {
                elemEnableSoundEffect.checked = items.EnableSoundEffect;
            }

            if (elemEnableFormattedYTTimestamp !== null) {
                elemEnableFormattedYTTimestamp.checked = items.EnableFormattedYTTimestamp;
            }

            if (elemEnableYTUtaWakuMode !== null) {
                elemEnableYTUtaWakuMode.checked = items.EnableYTUtaWakuMode;
            }

            if (elemEnableLegacyKeyListener !== null) {
                elemEnableLegacyKeyListener.checked = items.EnableLegacyKeyListener;
            }

            if (elemEnableLeftSideSpacePadding !== null) {
                elemEnableLeftSideSpacePadding.checked = items.EnableLeftSideSpacePadding;
            }

            if (elemEnableAppendingStartEndToken !== null) {
                elemEnableAppendingStartEndToken.checked = items.EnableAppendingStartEndToken;
            }

            if (elemSelectMIME !== null) {
                elemSelectMIME.value = items.MIME;
            }

            if (elemEnableAddAniGamerDanMu !== null) {
                elemEnableAddAniGamerDanMu.checked = items.EnableAddAniGamerDanMu;
            }
        }
    });
}