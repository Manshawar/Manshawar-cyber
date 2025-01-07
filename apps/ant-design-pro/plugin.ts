
import { IApi } from "@umijs/preset-umi"
export default (api: IApi) => {
  api.modifyHTML(($, { path }) => {
    $('head').append(`<style>
    .titlebar {
    height: 30px;
    background:transparent;
    user-select: none;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
  .titlebar-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    user-select: none;
    -webkit-user-select: none;
  }
  .titlebar-button:hover {
    background: #5bbec3;
  }
  .acss-trkbkn{
  padding-top: 30px !important;
  }
  </style>`);
    $('body').prepend(`<div data-tauri-drag-region class="titlebar">
    <div class="titlebar-button" id="titlebar-minimize">
      <img
        src="https://api.iconify.design/mdi:window-minimize.svg"
        alt="minimize"
      />
    </div>
    <div class="titlebar-button" id="titlebar-maximize">
      <img
        src="https://api.iconify.design/mdi:window-maximize.svg"
        alt="maximize"
      />
    </div>
    <div class="titlebar-button" id="titlebar-close">
      <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
    </div>
  </div>`);
    return $;
  })

};
