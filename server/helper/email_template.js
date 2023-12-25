module.exports = {
    template: `
    <!DOCTYPE html>
    <html>
   <head>
      <title>Page Title</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Varela+Round&display=swap" rel="stylesheet">
   </head>
   <body>
      <div style="
         padding: 3rem;
         display: flex;
         justify-content: center;
         align-items: center;
         flex-direction: column;
         background-color: #9667f3;
         font-family: 'Roboto', sans-serif;
         ">
         <img src="data:image/png;base64,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" alt="logo" style="padding-bottom: 2rem;">
         <div style="
            padding: 2rem 4rem;
            background: white;
            text-align: center;
            ">
            <h2 style="
               padding-bottom: 1rem;
               ">Password Reset</h2>
            <p style="
               display: flex;
               justify-content: center;
               align-items: center;
               flex-direction: column;
               padding-bottom: 1rem;
               ">
               <label>If you have lost your password or wish to reset it,</label>
               <label>use the link below to get started.</label>
            </p>
            <table width="100%" cellspacing="0" cellpadding="0">
               <tr>
                  <td>
                  <table width="100%" cellspacing="0" cellpadding="0">
                     <tr>
                        <td style="border-radius: 2px;">
                        <a href="{url}" target="_blank" style="border: none;
                        outline: none;
                        padding: 1rem;
                        background: #a67ff5;
                        color: white;
                        font-size: 14px;
                        font-weight: 700;
                        cursor: pointer;
                        text-decoration: none;
                        border-radius: 4px;">
                           Reset Your Password             
                        </a>
                        </td>
                     </tr>
                  </table>
                  </td>
               </tr>
            </table>
            <p style="
               display: flex;
               justify-content: center;
               align-items: center;
               flex-direction: column;
               padding-top: 1rem;
               ">
               <label>If you did not requested a password reset, you can safetly ignore this email.</label>
               <label>a person with access to your email can reset your account password.</label>
            </p>
         </div>
      </div>
   </body>
</html>`
}