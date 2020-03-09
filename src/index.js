function eval() {
    // Do not use eval!!!
    return;
}
const OPERATIONS = {
    "*": (a, b) => Number(a) * Number(b),
    "/": (a, b) => {
        if (!Number(b)) throw new Error("TypeError: Division by zero.")
        return Number(a) / Number(b)
    },
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => Number(a) - Number(b)
}

const PRIORITY = {
    "*": 2,
    '/': 2,
    '+': 1,
    '-': 1
}


function countWithoutParentheses(array) {
    let oneAction
    let newArray
    let indexes = {}
    let maxValueIndex
    let maxIndexValue

    for (let i = 0; i < array.length; i++) {
        if (!(/\d/.test(array[i]))) {
            indexes[i] = PRIORITY[array[i]]
        }

    }

    maxValueIndex = getMax(indexes)
    maxIndexValue = Number(getKeyByValue(indexes, maxValueIndex))


    oneAction = (OPERATIONS[array[maxIndexValue]](array[maxIndexValue - 1], array[maxIndexValue + 1]))
    newArray = array.splice(maxIndexValue - 1, 3, oneAction)

    delete indexes[maxIndexValue]

    while (array.length > 1) {
        countWithoutParentheses(array)
    }
    return array[0]

}


function fromHardToSimple(array) {
    let closeIndex = array.indexOf(')')
    let startIndex = 1
    for (let i = closeIndex; i >= 0; i--) {
        if (array[i] == '(') {
            startIndex += i
            break
        }
    }

    let difference = closeIndex - startIndex
    let simplePart = array.slice(startIndex, closeIndex)
    let simplePartAnswer = countWithoutParentheses(simplePart)
    array.splice(startIndex - 1, difference + 2, simplePartAnswer)
    if (array.length > 1 && array.indexOf(')') > 1) {
        return fromHardToSimple(array)
    }
    return array
}




function expressionCalculator(expr) {
    let arr = expr.replace(/\s/g, '').split(/\b/g).map((curr) => {
        return /\D/.test(curr) && curr.length > 1 ? curr.split('') : curr
    }).flat()

    let parenthesesArr = expr.match(/\(|\)/g)
    if (!parenthesesArr) {
        return parseFloat(countWithoutParentheses(arr))
    } else {
        let parenthesesValid = parenthesesArr.reduce((acc, curr) => {
            curr == '(' ? acc++ : acc--
            return acc
        }, 0)
        if (parenthesesValid !== 0) {
            throw new Error("ExpressionError: Brackets must be paired")
        }
        return countWithoutParentheses(fromHardToSimple(arr))

    }

}


function getMax(obj) {
    return Math.max(...Object.values(obj));
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function getObjectLength(object) {
    return Object.keys(object).length
}

module.exports = {
    expressionCalculator
}