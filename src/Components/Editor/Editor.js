import React, {useState} from 'react';
import './Editor.css';
import './EditorMedia.css';
import {event} from '../../gtag';

const htmlCode = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="#" />   
  <title>JS Bin</title>
</head>
<body>
<h3>Welcome to the Code Editor</h3>
<p>Write your code!!!</p>
<script defer src="#"></script>
</body>
</html>`

// let cssCode = `
// h3{
//     text-align: center;
// }
    
// img{
//     margin-left: 10%;
//     width: 500px;
//     height: 300px;
//     border-radius: 30px;
// }`


function Editor(){

    const [languages, setLanguages] = useState({
        html: htmlCode,
        css: "",
        javaScript: ""
    })

    const [currentWindow, setCurrentWindow] = useState('html') //to display currentwindow code language on first load/render
    const [output, setOutput] = useState(""); // to render an output using this state
    const [autoRun, setAutoRun] = useState(false); // to toggle autorun 
    const [isDarkMode, setIsDarkMode] = useState(false); // to toggle mode
    

    const languagesTab = Object.keys(languages).map((item, index) => ( 
        //object.keys will return all the keys of the object in an array format. So here we will get [html, css, javaScript]
        // Here we are mapping the object so that if in future we will add more languages then it will automatically create buttons for newly added language
        <button key={index}
            className={currentWindow===item? 'active' : '' || isDarkMode ? 'buttonDarkMode' : ''}  //use shorthand property
            onClick={() => handleClick(item)}>
            {item.toUpperCase()}
        </button>
    ))

    function placeholder(){
        if(currentWindow === 'css'){
            return '//write your CSS code here...'
        }else {
            return '//write your JavaScript code here...'
        }       
    }

//This will replace css and JS predefined tags with updated css 
// and JS inside individual editor present in our webpage.

   const bindLanguages = () => {
    let html = languages.html
    const bindCssJs = html.replace(`<script defer src="#"></script>`, `<script>${languages.javaScript}</script>`).replace(`<link rel="stylesheet" href="#" />`, `<style>${languages.css}</style>`)
    // console.log(bindCssJs)
    return bindCssJs;
   }
  

    //To handle editor change
    const handleEditorChange = (e) => {
        const language = {...languages}
      // cloning the languages by breaking the reference using spread operator and it is an example of call by value
    // the above can be used as below as well by destructuring 
      //   const  {html, css, javaScript} = languages
    //   console.log(html, css, javaScript)

       language[currentWindow] = e.target.value // the language will target current window language
        setLanguages(language) // this will overrite an object and this will call the render function and render it

        if(autoRun){  //if autoRun is enabled then this will render currentwindow output
            setOutput(language[currentWindow]) // if html is set as language then it will render html in output and same for other languages
    }
    }
    //To print an outout in iframe onclicking on run button:
    const handleRun = (e) => {
        e.preventDefault()
        setOutput(bindLanguages) //we are setting an output with binded css and JS to html page in an output after clicking on Run button
        event({
            action: 'Run button clicked',
            category: 'run',
            label: 'run'
          });
    }

    const handleClick = (e) => {
        setCurrentWindow(e)
    }

    const handleMode = () => {
        setIsDarkMode(!isDarkMode) // This will toggle the lightmode & darkmode
        if(isDarkMode===true){
            event({
                action: 'light mode',
                category: 'light',
                label: 'light'
              });
        }else{
            event({
                action: 'dark mode',
                category: 'dark',
                label: 'dark'
              });
        }
    }

    const handleAutoRun = () => {
        setOutput(bindLanguages)
        setAutoRun(!autoRun) //we are toggling the auto run button so that it will change its current state on every click
        event({
            action: 'Autorun clicked',
            category: 'autorun',
            label: 'autorun'
          });
    }


  return (
    <div>
        <header className={isDarkMode ? 'headerDarkMode' : ''}>
            <h3>Code Editor</h3>
            <p>Use this editor to create interactive web pages.</p>
        </header>

        <div className={isDarkMode ? 'tabsDarkMode' : 'tabs'}>
            <div className='lefttabs'> 
                    {languagesTab}               {/* this will render language buttons dynamically. */}  
            </div>
              
            <div className='righttabs'>
                {/* Run button */}
                    <button className={isDarkMode ? 'buttonDarkMode' : ''} style={{backgroundColor: '#04A21C'}} onClick={handleRun}>
                        Run<i className="fa-solid fa-play icon"></i>
                    </button>

                {/* Auto run button */}
                    <button 
                        className={autoRun ? 'active' : '' || isDarkMode ? 'buttonDarkMode' : ''}
                        onClick={handleAutoRun}>Auto run
                    </button>

                
                {/* Dark mode light mode button */}
                <button 
                        className={isDarkMode ? 'active' : '' || isDarkMode ? 'buttonDarkMode' : ''} 
                        onClick={handleMode}>{isDarkMode? <i className="fa-sharp fa-solid fa-sun modeIcon" style={{borderRadious: '50%'}}></i> : <i className="fa-solid fa-moon modeIcon"></i>}
                </button> 
            </div>
        </div>
           
       
    <div className='main'>          
        <div className='editorWindows'>
            <textarea 
                    className={isDarkMode ? 'editor darkMode' : 'editor'} 
                    value={languages[currentWindow]} 
                    // placeholder={languages[currentWindow]===languages.css ? '//write your css code here...' : ''}
                    placeholder={placeholder()}
                    rows="8" 
                    style={{resize: 'none'}} 
                    onChange={handleEditorChange}
                />
                
                <iframe 
                style={{backgroundColor:'white'}}
                    title='outputwindow'
                    srcDoc={output} //we are passing an output to iframe with the help of srcDoc.
                    className='main output'
                    sandbox='allow-scripts'  //allows to run scripts
                    // output text doesn't require dark or light mode it will be updated by the user in editor   
                />
        </div> 
           
        </div>
        </div> 
  )
}


export default Editor;
