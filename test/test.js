const chai = require("chai");
const app = require("../App")
const chaihttp = require("chai-http");
chai.use(chaihttp);
const assert = chai.assert;
const should = chai.should();

describe('App', () => {
    
   it('login', (done)=>{
      chai.request(app).post('/api/user/login').send({username:'tester1'}).end(
          (err, res)=>{
              const status = res.status;
              assert(res.body.user.username, 'tester1', 'username is not correct, which means that user is not stored in database');
              assert.equal(status, 201);
              done();
          }
      )
   });

   it('get chat history', (done)=>{
       chai.request(app).post('/api/user/conversationhistory').send({username:'tester1', friendname:'tester2'}).end(
           (err, res)=>{
               const status= res.status;
               assert.property(res.body, 'history');
               assert(201, status, 'the status is not correct');
               done();
           }
       )
   });

   
   it('add content to conversation', (done)=>{
    chai.request(app).post('/api/user/addcontenttoconversation').send({username:'tester1', friendname:'tester2'}).end(
        (err, res)=>{
            const status= res.status;
            assert.property(res.body, 'user');
            assert(201, status, 'the status is not correct');
            done();
        }
    )
});

})