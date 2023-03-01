const Pool = require('./../config/db')

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, results) =>{
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const createUser = (data) => {
    const {id, email, password, fullname, otp} = data
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO users(id, email, password, fullname, otp) VALUES('${id}','${email}','${password}','${fullname}', '${otp}')`, (err, results) =>{
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const selectUserById = (id) => {
    return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM users WHERE id='${id}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
  }

const verifyUser = (id) => {
    return Pool.query(
        `UPDATE users SET is_verif = 1 WHERE id = '${id}'`
    )
}

module.exports = {findUserByEmail, createUser, selectUserById, verifyUser}