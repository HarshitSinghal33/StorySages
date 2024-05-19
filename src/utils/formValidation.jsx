import * as Yup from 'yup'

export const validateName = () => {
    return Yup.string().trim().required('Please enter your name').max(33, '33 is Maximum words limit')
}

export const validateEmail = () => {
    return Yup.string().email("Invalid email address!").required('Email is required!')
}

export const validatePassword = () => {
    return Yup.string().required('Password is required!').trim().min(6, 'Password must be of 6 and more digit')
}

export const recheckPassword = () => {
    return Yup.string().required('Confirm your password').oneOf([Yup.ref('password')], 'Password must match')
}

export const validateTitle = () => {
    return Yup.string().required("Story title is required.").trim().test('words-test', "Title should not be more than 21 words!", function (value) {
        return value.trim().split(' ').length <= 21
    })
}

export const validateDescription = (checkBoxChecked) => {
    return Yup.string().test('words-test', "Write atleast 15 words on Snap", function (value) {
        if (checkBoxChecked === 'draft') return true;
        return value.trim().split(' ').length >= 15
    }).test('words-test', "Snap should not be more than 45 words", function (value) {
        if (checkBoxChecked === 'draft') return true;
        return value.trim().split(' ').length <= 45
    })
}

export const validateStory = (checkBoxChecked) => {
    return Yup.array().test('words-test', "For public sharing, please include a minimum of 210 words and for Private and Unlisted atleast 120 words. No restrictions apply on Draft.", (story) => {
        const combineInsert = story.map(obj => obj.insert).join('')
        if (checkBoxChecked === 'public') {
            return combineInsert.trim().split(' ').length >= 210
        }
        if (checkBoxChecked === 'unlisted' || checkBoxChecked === 'private') {
            return combineInsert.trim().split(' ').length >= 120
        }
        return true
    })
}