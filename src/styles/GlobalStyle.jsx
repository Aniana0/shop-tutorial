import { createGlobalStyle, styled } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* v2.0 | 20110126
  http://meyerweb.com/eric/tools/css/reset/ 
  License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
   margin: 0;
   padding: 0;
   border: 0;
   font-size: 100%;
   /* font: inherit; */
   vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
   display: block;
}
body {
   line-height: 1;
}
ol, ul {
   list-style: none;
}
blockquote, q {
   quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
   content: '';
   content: none;
}
table {
   border-collapse: collapse;
   border-spacing: 0;
}
a{
   text-decoration: none;
}
img{
   display: block;
   width: 100%;
}
.container{
    max-width: 1280px;
    margin: 0px auto;
}
.productsList{
   display: flex;
   gap: 24px 5%;
   flex-wrap: wrap;
   li{
      flex-shrink: 0;
      flex-basis: 30%;
      .imgWrap{
         position: relative;
         width: 100%;
         padding-top: 100%;
         img{
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            top: 0;
         }
      }
   }
}

.detailPage{
   max-width: 1024px;
   display: flex;
   gap: 40px;
   margin: 0px auto;
   .detailImg{
      max-width: 400px;
      img{
         object-fit: cover;
         display: block;
      }
   }
   .detailText{
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      h2{
         width: 100%;
         font-size: 24px;
         font-weight: normal;
         border-bottom: solid 1px #2fb843;
         padding-bottom: 16px;
         color: #0c871f;
      }
      p{
         width: 100%;
         padding-bottom: 16px;
         color: rgba(0,0,0,0.7);
         display: flex;
         font-size: 20px;
         span{
            padding-left: 80px;
         }
      }
      .detailOpt{
         width: 100%;
         display: flex;
         align-items: center;
         margin-bottom: 16px;
         label{
            font-size: 20px;
            color: rgba(0,0,0,0.7);
         }
         select{
            margin-left: 80px;
            width: 200px;
            padding: 6px 12px;
            border: 1px solid #2fb843;
            border-radius: 0px;
         }
      }
      .detailBtns{
         display: flex;
         gap: 16px;
         margin-top: auto;
         flex-direction: column;
         button{
            width: 100%;
            height: 50px;
            border-radius: 5px;
            border: none;
         }
         .cartBtn{
            background-color: #2fb843;
            color: white;
         }
         .buyBtn{
            background-color : #dac379;
         }
      }
   }
}
.cartList{
   display: flex;
   flex-direction: column;
   border-top: solid 1px rgba(0,0,0,0.3);
   margin: 24px 0px;
   li{
      display: flex;
      align-items:center;
      justify-content: space-between;
      border-bottom: solid 1px rgba(0,0,0,0.3);
      padding: 12px 0px;
      div{
         gap: 12px;
         align-items: center;
         display: flex;
         &.textWrap{
            flex-basis: 70%;
         }
         &.quantityWrap{
            flex-basis: 20%;
            p{
               width: 100%;
               text-align: right;
            }
            
         }
      }
      img{
         width: 100px;
         height: 100px;
         object-fit: cover;
         display: block;
      }
   }
}
`
export default GlobalStyle;