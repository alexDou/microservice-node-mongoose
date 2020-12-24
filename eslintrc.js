module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "extends": [
        "eslint:recommended",
        "airbnb-base"
    ],
    "rules": {
        "array-bracket-spacing": [
            2,
            "never"
        ],
        "block-scoped-var": 2,
        "brace-style": [
            2,
            "1tbs"
        ],
        "camelcase": 1,
        "comma-dangle": [
            0
        ],
        "computed-property-spacing": [
            2,
            "never"
        ],
        "curly": 2,
        "eol-last": 2,
        "eqeqeq": [
            2,
            "smart"
        ],
        "indent": [
            2,
            2,
            {
                "SwitchCase": 1
            }
        ],
        "keyword-spacing": [
            2,
            {
                "before": true,
                "after": true
            }
        ],
        "max-depth": [
            1,
            3
        ],
        "max-len": [
            1,
            120
        ],
        "max-statements": [
            1,
            15
        ],
        "new-cap": 1,
        "no-extend-native": 2,
        "no-mixed-spaces-and-tabs": 2,
        "no-trailing-spaces": 2,
        "no-underscore-dangle": [0],
        "no-unused-vars": 1,
        "no-use-before-define": [
            2,
            "nofunc"
        ],
        "object-curly-spacing": [
            1,
            "always"
        ],
        "quotes": [
            2,
            "single",
            "avoid-escape"
        ],
        "semi": [
            2,
            "always"
        ],
        "space-before-function-paren": [2, {
            "anonymous": "always",
            "named": "never"
        }],
        "space-unary-ops": 2
    }
}