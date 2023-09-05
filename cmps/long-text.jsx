const { useState } = React

export function LongTxt({ txt, length = 50 }) {
    const [isLongTxtShown, setIsLongTxtShown] = useState(false)
    
    function toggleIsLongTxtShown() {
        setIsLongTxtShown(!isLongTxtShown)
    }
    
    if (txt.length <= length) return <span>{txt}</span>
    return (
        <span>
        {isLongTxtShown ? txt : `${txt.substring(0, length)}...`}
        <button id="expendTxt" onClick={toggleIsLongTxtShown}>
            {isLongTxtShown ? "Show Less" : "Show More"}
        </button>
        </span>
    )
}