import React, { useState } from 'react';

const umlautMap = {
  '\u00dc': 'UE',
  '\u00c4': 'AE',
  '\u00d6': 'OE',
  '\u00fc': 'ue',
  '\u00e4': 'ae',
  '\u00f6': 'oe',
  '\u00df': 'ss',
}

function replaceUmlaute(str) {
  return str
    .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
      const big = umlautMap[a.slice(0, 1)];
      return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
    })
    .replace(new RegExp('['+Object.keys(umlautMap).join('|')+']',"g"),
      (a) => umlautMap[a]
    );
}

function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

const caesar = (text, offset, encode) => {
	const alphabet = genCharArray('A', 'Z');

	var shifted = [];
	for (var i = 0; i < alphabet.length; i++) {
		const c = alphabet[(i + offset) % alphabet.length];
		shifted.push(c);
	}

	var table = {};
	if (encode) {
		for (var i = 0; i < alphabet.length; i++) {
			table[alphabet[i]] = shifted[i];
		}
	} else {
		for (var i = 0; i < alphabet.length; i++) {
			table[shifted[i]] = alphabet[i];
		}
	}

	text = replaceUmlaute(text);
	text = text.replace(/ /g, "");
	text = text.replace(/[^a-zA-Z ]/g, "");
	text = text.toUpperCase();
	var cipher = "";
	for (var i = 0; i < text.length; i++) {
		//if (i % 20 === 0) cipher += '\n';
		cipher += table[text[i]];
	}

	return cipher;
}

function CaesarForm() {

	const [text, setText] = useState('');
	const [cipher, setCipher] = useState([]);
	const [encode, setEncode] = useState(true);
	const [offset, setOffset] = useState(2);

	const [submitting, setSubmitting] = useState(false);
	const handleSubmit = event => {
	   event.preventDefault();
	   setCipher(caesar(text, offset, encode));
	   setSubmitting(true);
	}

	

  return(
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <fieldset>
        	<h1>Cäsar Kodierer</h1>
          	<label>
            <p>Klartext:</p>
            <textarea
            	cols="40"
            	rows="5"
            	onChange={event => setText(event.target.value)}
            />         	
          	</label>
          	
          	<br />

          	<label for="checker">
          	<br />
          	Verschlüsseln? 
            <input
            	type="checkbox"
            	if="checker"
            	defaultChecked={encode}
				onChange={() => setEncode(!encode)}	                        	
            />
            <br />
          	</label>

          	<label for="offset">Offset: </label>
	        <input
	        	id="offset"
	        	value={offset}
				onChange={event => setOffset(Number(event.target.value))}
				style={{width: "30px"}}	                       	
	        />

          	<label>
            <p>Chiffre:</p>
            <textarea
            	style={{
            		color: "black",
            		backgroundColor: "#B5B6B6"
            	}}
            	disabled
            	cols="40"
            	rows="5"
            	value={cipher}
            />         	
          	</label>
          	<br />
          	<button type="submit" style={{padding: "10px 80px"}}>Kodieren</button>         
        </fieldset>
        
      </form>
    </div>
  )
}

export default CaesarForm;
