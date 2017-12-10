const bip39 = require('bip39');
const scrypt = require('scrypt');
const xor = require('buffer-xor');
const base58 = require('bs58');
const crypto = require('crypto');
const md5 = require('js-md5');
//console.log(args);

function usage() {
  console.log('Usage: recovery-seed encrypt PASSWORD "MNEMONIC"');
  console.log('Usage: recovery-seed decrypt PASSWORD SALT "MNEMONIC"');
  process.exit();
}
var args = process.argv.slice(2);



var mode = args[0];
if(mode == 'encrypt') {
  if(args.length < 3) {
    usage();
  }

  var password = args[1];
  var mnemonic = args[2];

  var seedHex = bip39.mnemonicToEntropy(mnemonic);
//  console.log("seed    = " + seedHex);
  var seed = new Buffer(seedHex, 'hex');
  var salt = base58.encode(crypto.randomBytes(8));
  console.log("md5: " + md5(mnemonic));
  console.log("Salt: " + salt);
  var pHash = scrypt.hashSync(password, {"N": 16384, "r": 8, "p": 1}, 32, salt);
//  console.log("Hash: " + pHash.toString('hex'));

  var encSeed = xor(seed, pHash);
  var encSeed58 = base58.encode(encSeed);
//  console.log("encSeed: " + encSeed.toString('hex'));
  //console.log("base58  = " + encSeed58);


  //qr.toDataURL(encSeed58, function (err, url) {
  //  console.log(url)
  //})

  var encMnemonic = bip39.entropyToMnemonic(encSeed);
  console.log("Mnemonic: " + encMnemonic);
} else if(mode == 'decrypt') {
  if(args.length < 4) {
    usage();
  }
  var password = args[1];
  var salt = args[2];
  var mnemonic = args[3];
  var seedHex = bip39.mnemonicToEntropy(mnemonic);
//  console.log("seed = " + seedHex);
  var seed = new Buffer(seedHex, 'hex');
  var pHash = scrypt.hashSync(password, {"N": 16384, "r": 8, "p": 1}, 32, salt);
//  console.log("Hash: " + pHash.toString('hex'));
  var dSeed = xor(seed, pHash);
  var dMnemonic = bip39.entropyToMnemonic(dSeed);
  console.log("Mnemonic: " + dMnemonic);
  console.log("md5: " + md5(dMnemonic));

} else {
  usage();
}
