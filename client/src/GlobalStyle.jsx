import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import "./styles/fonts.less";
    h1 {
        font-size: 16px;
    }
    .boldBody {
        font-family: 'NunitoSansExtraBold';
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        line-height: 22px;
    }
    .supportText {
        font-family: 'NunitoSansLightItalic';
        font-style: italic;
        font-weight: 300;
        font-size: 14px;
        line-height: 18px;
    }
    .separatorPoint {
        width: 4px;
        height: 4px;
        background: #767676;
        border-radius: 2px;
    }
    
  `;
