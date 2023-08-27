import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';

//Atm project 
//User Data
interface User {
  id:number,
  pin:number,
  name:string,
  acccountNumber:number,
  balnce:number
}
const userData =()=>{
  let users:User[]=[]
    for (let i=0;i<5;i++){
    let user:User = {
      id:i,
      pin: 1000 + i,
      name:faker.person.fullName(),
      acccountNumber:Math.floor(1000000 * Math.random()*9000000),
      balnce: 100000 * i
    }
    users.push(user)
    }
    return users
    }
      //Atm mechine

      const atmMachine = async(users:User[])=>{
        const res = await inquirer.prompt({
         type : "number",
         message : "Enter your pin code",
         name:"pin"
        });
        console.log(res);
        const user = users.find((val)=>val.pin==res.pin)
        if(user){
          console.log(`Wellcome ${user.name}`);
          atmFunc(user);
          return;
        }
      console.log("invalid pin code")
      };
      //Atm Function
       const atmFunc= async(user:User)=>{
        const ans = await inquirer.prompt({
          type:"list",
          message: "Select the option",
          name:"select",
          choices:["withDrwal" , "Deposit" , "Balance" , "Exit"]
        });
            if(ans.select=="withDrwal"){
              const amount = await inquirer.prompt({
                type:"number",
                message: "Enter your amount",
                name: "rupee"
              })
              if(amount.rupee > user.balnce){
                return console.log("Your balance is insufficient")
              }
              if(amount.rupee > 100000){
                return console.log("you cant withdrwal above of 100000")
              }
              console.log(`WithDrwal amount : ${amount.rupee}`);
              console.log(` Amount Due  : ${user.balnce- amount.rupee}`);
            }
            if(ans.select=="Deposit"){
              const depo = await inquirer.prompt({
                type:"number",
                message:"Deposit Amount",
                name:"rupee"
              })
              console.log (`Deposit Amount ${depo.rupee}`);
              console.log (` Total amount ${ user.balnce + depo.rupee}`);
            }
            if(ans.select=="Balance"){
              console.log(` Amount Due  : ${user.balnce}`);
              return;
            }
            if(ans.select=="Exit"){
              console.log("Thanks for using Atm ....")
            }
       }
     


    let users = userData();
    atmMachine(users);
    
  
  
