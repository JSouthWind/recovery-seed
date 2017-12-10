var args = process.argv.slice(2);
const bip39 = require('bip39');
const scrypt = require('scrypt');
const xor = require('buffer-xor');
const qr = require('qrcode');
const base58 = require('bs58');

//console.log(args);
var password = args[0];
var mnemonic = args[1];


var seedHex = bip39.mnemonicToEntropy(mnemonic);
console.log("seed    = " + seedHex);
var seed = new Buffer(seedHex, 'hex');
var pHash = scrypt.hashSync(password, {"N": 16384, "r": 8, "p": 1}, 32, "salt");
console.log(pHash.toString('hex'));

var encSeed = xor(seed, pHash);
var encSeed58 = base58.encode(encSeed);
console.log("encSeed = " + encSeed.toString('hex'));
console.log("base58  = " + encSeed58);

qr.toDataURL(encSeed58, function (err, url) {
  console.log(url)
})

var encMnemonic = bip39.entropyToMnemonic(encSeed);
console.log(encMnemonic);
