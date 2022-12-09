# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "@fortawesome/fontawesome-free", to: "https://ga.jspm.io/npm:@fortawesome/fontawesome-free@6.2.1/js/all.js"
pin "ethers" # @5.7.2
pin "@ethersproject/abi", to: "@ethersproject--abi.js" # @5.7.0
pin "@ethersproject/abstract-provider", to: "@ethersproject--abstract-provider.js" # @5.7.0
pin "@ethersproject/abstract-signer", to: "@ethersproject--abstract-signer.js" # @5.7.0
pin "@ethersproject/address", to: "@ethersproject--address.js" # @5.7.0
pin "@ethersproject/base64", to: "@ethersproject--base64.js" # @5.7.0
pin "@ethersproject/basex", to: "@ethersproject--basex.js" # @5.7.0
pin "@ethersproject/bignumber", to: "@ethersproject--bignumber.js" # @5.7.0
pin "@ethersproject/bytes", to: "@ethersproject--bytes.js" # @5.7.0
pin "@ethersproject/constants", to: "@ethersproject--constants.js" # @5.7.0
pin "@ethersproject/contracts", to: "@ethersproject--contracts.js" # @5.7.0
pin "@ethersproject/hash", to: "@ethersproject--hash.js" # @5.7.0
pin "@ethersproject/hdnode", to: "@ethersproject--hdnode.js" # @5.7.0
pin "@ethersproject/json-wallets", to: "@ethersproject--json-wallets.js" # @5.7.0
pin "@ethersproject/keccak256", to: "@ethersproject--keccak256.js" # @5.7.0
pin "@ethersproject/logger", to: "@ethersproject--logger.js" # @5.7.0
pin "@ethersproject/networks", to: "@ethersproject--networks.js" # @5.7.1
pin "@ethersproject/pbkdf2", to: "@ethersproject--pbkdf2.js" # @5.7.0
pin "@ethersproject/properties", to: "@ethersproject--properties.js" # @5.7.0
pin "@ethersproject/providers", to: "@ethersproject--providers.js" # @5.7.2
pin "@ethersproject/random", to: "@ethersproject--random.js" # @5.7.0
pin "@ethersproject/rlp", to: "@ethersproject--rlp.js" # @5.7.0
pin "@ethersproject/sha2", to: "@ethersproject--sha2.js" # @5.7.0
pin "@ethersproject/signing-key", to: "@ethersproject--signing-key.js" # @5.7.0
pin "@ethersproject/solidity", to: "@ethersproject--solidity.js" # @5.7.0
pin "@ethersproject/strings", to: "@ethersproject--strings.js" # @5.7.0
pin "@ethersproject/transactions", to: "@ethersproject--transactions.js" # @5.7.0
pin "@ethersproject/units", to: "@ethersproject--units.js" # @5.7.0
pin "@ethersproject/wallet", to: "@ethersproject--wallet.js" # @5.7.0
pin "@ethersproject/web", to: "@ethersproject--web.js" # @5.7.1
pin "@ethersproject/wordlists", to: "@ethersproject--wordlists.js" # @5.7.0
pin "aes-js" # @3.0.0
pin "bech32" # @1.1.4
pin "bn.js" # @5.2.1
pin "buffer" # @2.0.0
pin "hash.js" # @1.1.7
pin "inherits" # @2.0.4
pin "js-sha3" # @0.8.0
pin "minimalistic-assert" # @1.0.1
pin "process" # @2.0.0
pin "scrypt-js" # @3.0.1
