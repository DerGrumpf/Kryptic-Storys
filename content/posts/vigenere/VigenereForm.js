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

const alphabet = genCharArray('A', 'Z');

const shifted = offset => {
	var s = [];
	for (var i = 0; i < alphabet.length; i++) {
		const c = alphabet[(i + offset) % alphabet.length];
		s.push(c);
	}
	return s;
}

const table = () => {
	t = {};
	for (var i = 0; i < alphabet.length; i++) {
			t[alphabet[i]] = shifted(i);
	}
	return t;
}

const encoder = (c, k) => {

}

const decoder = (c, k) => {

}

const vigenere = (text, key, encode) => {
	text = replaceUmlaute(text);
	text = text.replace(/ /g, "");
	text = text.replace(/[^a-zA-Z ]/g, "");
	text = text.toUpperCase();

	key = replaceUmlaute(key);
	key = key.replace(/ /g, "");
	key = key.replace(/[^a-zA-Z ]/g, "");
	key = key.toUpperCase();

	var cipher = "";
	return cipher;
}