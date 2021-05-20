import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

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

function prepareText(text) {
  text = replaceUmlaute(text);
  text = text.replace(/ /g, "");
  text = text.replace(/[^a-zA-Z ]/g, "");
  text = text.toUpperCase();
  return text;
}

const VerticalBar = () => {
  const [text, setText] = useState('');
  const [ha, setHA] = useState(Array.apply(null, Array(26)).map(Number.prototype.valueOf,0));

  const options = {
    indexAxis: 'x',

    elements: {
      bar: {
        borderWidth: 6,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const data = {
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    datasets: [
      {
        label: 'Häufigkeit in %',
        data: [6.51, 1.89, 3.06, 5.08, 17.4, 1.66, 3.01, 4.76, 7.55, 0.27, 1.21, 3.44, 2.53, 9.78, 2.51, 0.76, 0.02, 7, 7.27, 6.15, 4.35, 0.67, 1.89, 0.03, 0.04, 1.13],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Texthäufigkeit in %',
        data: ha,
        backgroundColor: [
          'rgba(151, 255, 255, 0.7)',
          'rgba(82, 139, 139, 0.7)',
        ],
        borderColor: [
          'rgba(151, 255, 255, 1)',
          'rgba(82, 139, 139, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };




  const handleSubmit = event => {
    event.preventDefault();

    var t = prepareText(text);

    const alphabet = genCharArray('A', 'Z');
    var table = {};
    for (var i = 0; i < alphabet.length; i++) {
      table[alphabet[i]] = 0;
    }

    for (i = 0; i < t.length; i++) {
      table[t[i]] += 1;
    }

    var hat = [];
    for (i = 0; i < alphabet.length; i++) {
      hat.push(table[alphabet[i]] / t.length * 100);
    }

    setHA(hat);
    console.log(data.datasets[1].data);
    console.log(table);
    console.log(ha);
  }

  return (
  <>
    <div className='header'>
      <h1 className='title'>Häufigkeitsverteilung in der deutschen Sprache</h1>
    </div>
    <Bar data={data} options={options} />
    <form onSubmit={handleSubmit}>
        <fieldset>
          <h1>Häuigkeits Analyser</h1>
            <label>
            <p>Chiffre:</p>
            <textarea
              cols="40"
              rows="15"
              onChange={event => setText(event.target.value)}
            />          
            </label>
            <br />
            <button type="submit" style={{padding: "10px 80px"}}>Analysieren</button>         
        </fieldset>
        
      </form>
  </>
)};

export default VerticalBar;