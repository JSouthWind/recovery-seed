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

//md5 reduced to 32 bits and converted to base58
function rmd5(val) {
  var sum = md5(val);
  var buf = new Buffer("00000000", 'hex');
  for(var i=0; i<4; i++) {
    var nbuf = xor(buf, new Buffer(sum.slice(i*8, (i+1)*8), 'hex') );
    buf = nbuf;
  }
  return base58.encode(buf);
}

function encrypt(password, salt, mnemonic) {
  var seedHex = bip39.mnemonicToEntropy(mnemonic);
  var seed = new Buffer(seedHex, 'hex');
  var pHash = scrypt.hashSync(password, {"N": 16384, "r": 8, "p": 1}, 32, salt);

  var encSeed = xor(seed, pHash);
  var encSeed58 = base58.encode(encSeed);
  return bip39.entropyToMnemonic(encSeed);
}

function decrypt(password, salt, mnemonic) {
  var seedHex = bip39.mnemonicToEntropy(mnemonic);
  var seed = new Buffer(seedHex, 'hex');
  var pHash = scrypt.hashSync(password, {"N": 16384, "r": 8, "p": 1}, 32, salt);
  var dSeed = xor(seed, pHash);
  var dMnemonic = bip39.entropyToMnemonic(dSeed);
  return dMnemonic;
}

var args = process.argv.slice(2);

var mode = args[0];
if(mode == 'encrypt') {
  if(args.length < 3) {
    usage();
  }
  var password = args[1];
  var mnemonic = args[2];
  var salt = base58.encode(crypto.randomBytes(8));
  var encMnemonic = encrypt(password, salt, mnemonic);
  console.log("Mnemonic: " + encMnemonic);
  console.log("Salt    : " + salt);
  var realMd5 = rmd5(mnemonic);
  var testMd5 = rmd5(decrypt("test", salt, encMnemonic));
  console.log("Checksum: " + testMd5 + " " + realMd5);


} else if(mode == 'decrypt') {
  if(args.length < 4) {
    usage();
  }
  var password = args[1];
  var salt = args[2];
  var mnemonic = args[3];
  var dMnemonic = decrypt(password, salt, mnemonic);
  console.log("Mnemonic: " + dMnemonic);
  console.log("Checksum: " + rmd5(dMnemonic) );

} else {
  usage();
}
