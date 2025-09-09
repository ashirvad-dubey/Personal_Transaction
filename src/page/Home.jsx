import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'bootstrap';



export default function Home(){

const [name, setName] = useState("");
        const[currnt,setCurrnt]=useState("");
      const [modalShowdebit, setModalShowDebit] = useState(false);
      const[modalshowcredit,setModalShowCredit] =useState(false);
      const[modalshowupdt,setModalShowUpdt]=useState(false);
      const[data,setData]=useState([]);
      const[uid,setId]=useState('');
      const[sid,setSid]=useState('');
      const[searchrecord,setSearchRecord]=useState('');
      const[date,setDate]=useState('');
      const[notes,setNotes]=useState('');
      const[amount,setAmount]=useState('');
      const[debitamount,setDebitAmount]=useState('');
     const[error,setError]=useState({date:"",notes:"",amount:"",debitamount:""});
      

      const handledate=(e)=>{setDate(e.target.value)};
      const handlenotes=(e)=>{setNotes(e.target.value)};
      const handleamount=(e)=>{setAmount(e.target.value)};
      const handledebitamount=(e)=>{setDebitAmount(e.target.value)};

      
const DateValidation=()=>{if(!date){return "Enter Date";}return ;};
const NotesValidation=()=>{if(!notes){return "Enter Notes";}return ;};
const AmountValidation=()=>{if(!amount){return "Enter Credit Amount";}return ;};
const DebitamountValidation=()=>{if(!debitamount){return "Enter Debit Amount";}return;};



    

      
//Show Name,and Open Amount;
       useEffect(() => {
        gethistory();
     const storedId = localStorage.getItem("id");         
      const storedName = localStorage.getItem("name");
      const storedopenamt = localStorage.getItem("openamt");
        if(storedId) setId(Number(storedId));
        if (storedName) {
      setName(storedName);}
      if (storedopenamt) {
      setCurrnt(Number(storedopenamt));}},[]);



        const add_debit=()=>{
          const dateerror=DateValidation();
          const noteserror=NotesValidation();
          const debitamounterror=DebitamountValidation();
         if(!date || !notes || !amount)
            {
            setError({date:dateerror,notes:noteserror,debitamount:debitamounterror})
            return;
          }

const uid = localStorage.getItem("id");
          const dt={
            uid:Number(uid),
            date:date,
            notes:notes,
            credit:0,
            debit:amount,
          }
    axios.post("https://ftrgqllvvkalmucafpwu.functions.supabase.co/personaltranscation/insert_debit",dt)
    .then(res=>{
      if(res.data.status===200){
       alert("Debit Successfully....!✅");
      gethistory();
      setModalShowDebit(false);
      setDate("");
      setNotes("");
      setAmount("");
    }
    else{ alert("Debit Failed....!❌");}});


         }



 const add_credit=()=>{
  const dateerror=DateValidation();
  const noteserror=NotesValidation();
  const amounterror=AmountValidation();
  if(!date || !notes || !amount){
    setError({date:dateerror,notes:noteserror,amount:amounterror})
    return;
  }
  
const uid = localStorage.getItem("id");
  const dt={
    uid: Number(uid),   
   date:date,
    notes:notes,
    credit: Number(amount),
    debit:0 
  }
  axios.post("https://ftrgqllvvkalmucafpwu.functions.supabase.co/personaltranscation/insert_credit",dt)
  .then(res=>{
    if(res.data.status===200){
      alert("Credit Successfully....!✅");
      gethistory();
      setModalShowCredit(false);
      setDate("");
      setNotes("");
      setAmount("");
    }
    else{ alert("Credit Failed....!❌");}})
   




  }




const totalCredit = data.reduce(
    (acc, item) => acc + Number(item.credit), 0
  )+ Number(currnt);

  const totalDebit = data.reduce(
    (acc, item) => acc + Number(item.debit),
     0);


const totalcredit_debit = data.reduce(
    (acc, item) => acc + Number(item.debit)+Number(item.credit), 0
  )+Number(currnt);

  const totalDebit_credit = data.reduce(
    (acc, item) => acc + Number(item.credit)-Number(item.debit),0
  )+Number(currnt);





 
  const gethistory=()=>{
    
   const uid = localStorage.getItem("id");
    axios.get("https://ftrgqllvvkalmucafpwu.functions.supabase.co/personaltranscation/history",{
      params: { uid: Number(uid) }})
    .then(res=>{ setData(res.data.data);});}

  

  const mainblance = data.reduce(
    (acc, item) => acc + Number(item.credit)-Number(item.debit),0
  )+Number(currnt);

  function getId(sid,notes,credit,debit){setSid(sid),setNotes(notes),setAmount(credit),setAmount(debit);}



  const Tblupdate=()=>{
          const noteserror=NotesValidation();
          const amounterror=AmountValidation();
          const debitamounterror=DebitamountValidation();
          if( !notes || !amount || !debitamount){
            setError({notes:noteserror,amount:amounterror,debitamount:debitamounterror})
            return;
          }

          const dt={
  sid:sid,
  notes:notes,
  credit:amount,
  debit:debitamount
}
console.log(dt);
axios.put('https://ftrgqllvvkalmucafpwu.functions.supabase.co/personaltranscation/tbl_update',dt)
.then(res=>{
  if(res.data.status===200){
    alert("Table Update Successfully....!✅");
setModalShowUpdt(false);
gethistory();
  }else{ alert("Table Update Failed....!❌");}});}



       const tbledelete=(sid)=>{
          const dt={sid:sid}
          axios.delete('https://ftrgqllvvkalmucafpwu.functions.supabase.co/personaltranscation/tbl_delete',{data:dt})
            .then(res=>{
              if(res.data.status===200){
            alert("Table Delete Successfully....!✅'") ; 
            gethistory();
           }else{ alert("Table Delete Failed....!❌");}});}





    return(
        <>     

    <Container><div className="board"><center>
      <h1>Welcome, <span>{name}</span></h1><p>Your personal transaction dashboard</p>
      </center></div> </Container>

    <Container>
      <Row>
        <Col>
    <Card id='cardopenamt'>
      <Card.Body>
        <Card.Title>Your Opening Amount</Card.Title>
        <Card.Text>
          
         <p><center><span>₹{currnt}</span></center></p>
        </Card.Text>
      </Card.Body>
    </Card>
        
        </Col>
        <Col>
         <Card id='cardtotlcredit' >
      <Card.Body>
        <Card.Title>Total Credit (incl.Opening Bal)</Card.Title>
        <Card.Text>
          <p>
       <center><span>₹{totalCredit}</span></center></p>
        </Card.Text>
      </Card.Body>
    </Card>
    
         
         </Col>
        <Col>
        
        <Card id='cardtotldedit' >
      <Card.Body>
        <Card.Title>Total Debit</Card.Title>
        <Card.Text>
          <p><center><span>₹{totalDebit}</span></center></p>
        </Card.Text>
      </Card.Body>
    </Card>
    
        
        </Col>
         <Col>
         
         <Card id='cardcurramt' >
      <Card.Body>
        <Card.Title>Your Current Blanace</Card.Title>
        <Card.Text>
        <p><center><span>₹{mainblance}</span></center></p>
        </Card.Text>
      </Card.Body>
    </Card>
    
         
         </Col>
      </Row>
      <Row>
        <Col><Card id='totl_c'>
      <Card.Body>
        <Card.Title>Total Credit + Debit (incl.Opening Bal)</Card.Title>
        <Card.Text>
         <p><center><span>₹{totalcredit_debit}</span></center></p>
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
        <Col xs={5}>
        <Card id='totld-b' >
      <Card.Body>
        <Card.Title>Total Credit - Debit (incl.Opening Bal)</Card.Title>
        <Card.Text>
          <p>  <center><span>₹{totalDebit_credit}</span></center></p>
        </Card.Text>
      </Card.Body>
    </Card></Col></Row>    </Container>

        <br />
    

        <Row >
        <Col ><Button className='debit_btn'  variant="danger" onClick={setModalShowDebit}><p>+ Add Debit</p></Button></Col>
        <Col><Button className='credit_btn'  variant="warning" onClick={setModalShowCredit}><p>- Add Credit</p></Button></Col>
      </Row>
          <Container>

        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search by Discripastion Credit debit"
              className="me-2"
              aria-label="Search"
              value={searchrecord} onChange={(e)=>setSearchRecord(e.target.value)}
            />
          </Form>

<br />
<Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Date</th>
          <th>Discripastion</th>
          <th>Credit(₹)</th>
          <th>Debit(₹)</th>
          <th>Update Course</th>
           <th>Delete Course</th>
        </tr></thead><tbody>
        {data.filter((item)=>
          item.notes.toLowerCase().includes(searchrecord.toLowerCase())||
          item.credit.toLowerCase().includes(searchrecord.toLowerCase())||
          item.debit.toLowerCase().includes(searchrecord.toLowerCase()))
        .map((item)=>{
            return(<tr>
           <td>{item.date}</td>
          <td>{item.notes}</td>
          <td>{item.credit}</td>
          <td>{item.debit}</td>

          <td><Button className='udtbtn' onClick={()=>{getId(item.sid,item.notes,item.debit,item.debit);setModalShowUpdt(true);}}
           variant="warning">Update</Button></td>
          <td><Button className='udtbtn' onClick={()=>{tbledelete(item.sid);}}variant="danger">Delete</Button></td>

        </tr>)})}</tbody></Table>   </Container>                  
            
{/*} Debit Model{*/}
    <Modal
      show={modalShowdebit} onHide={()=>setModalShowDebit(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ADD DEBIT...!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter Date :-</Form.Label>
              <Form.Control onChange={handledate} type="date" placeholder="Enter Current Date" />
            </Form.Group>
               {error.date && <p style={{ color: "red" }}>{error.date}</p>}

 <Form.Group className="mb-3">
              <Form.Label>Notes :-</Form.Label>
              <Form.Control onChange={handlenotes} type="text" placeholder="Enter Notes" />
            </Form.Group>
               {error.notes && <p style={{ color: "red" }}>{error.notes}</p>}

 <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control onChange={handleamount} type="number" placeholder="Enter Amount " />
            </Form.Group>
               {error.debitamount && <p style={{ color: "red" }}>{error.debitamount}</p>}

          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}}  variant="danger" onClick={()=>setModalShowDebit(false)}>Close</Button>
        <Button  style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}} variant="success" onClick={add_debit} >Add Debit</Button>

      </Modal.Footer>
    </Modal>



{/*} Credit Model{*/}

 <Modal
      show={modalshowcredit}onHide={()=>setModalShowCredit(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ADD CREDIT...!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter Date :-</Form.Label>
              <Form.Control onChange={handledate} type="date" placeholder="Enter Current Date" />
            </Form.Group>
               {error.date && <p style={{ color: "red" }}>{error.date}</p>}

 <Form.Group className="mb-3">
              <Form.Label>Notes :-</Form.Label>
              <Form.Control onChange={handlenotes} type="text" placeholder="Enter Notes" />
            </Form.Group>
               {error.notes && <p style={{ color: "red" }}>{error.notes}</p>}

 <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control onChange={handleamount} type="number" placeholder="Enter Amount " />
            </Form.Group>
               {error.amount && <p style={{ color: "red" }}>{error.amount}</p>}

          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}} variant="danger" onClick={()=>setModalShowCredit(false)}>Close</Button>
         <Button style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}} variant="success" onClick={add_credit} >Add Credit</Button>

      </Modal.Footer>
    </Modal>

{/*} Update Module {*/}

<Modal
      show={modalshowupdt}onHide={()=>setModalShowUpdt(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ADD CREDIT...!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{color:"red", display:"flex",justifyContent:"center",alignItems:"center",fontSize:"1.5rem",fontWeight:"bold"}}>IF CREDIT/DEBIT=0 SO PLEASE ENTER 0</p>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter New Notes :-</Form.Label>
              <Form.Control onChange={handlenotes} value={notes} type="text" placeholder="Enter Current Notes" />
            </Form.Group>
               {error.date && <p style={{ color: "red" }}>{error.date}</p>}

 <Form.Group className="mb-3">
              <Form.Label>Enter New Credit :-</Form.Label>
              <Form.Control onChange={handleamount}  type="text" placeholder="Enter New Credit" />
            </Form.Group>
               {error.amount && <p style={{ color: "red" }}>{error.amount}</p>}

 <Form.Group className="mb-3">
              <Form.Label>Enter new Debit</Form.Label>
              <Form.Control onChange={handledebitamount}  type="number" placeholder="Enter New Debit " />
            </Form.Group>
               {error.debitamount && <p style={{ color: "red" }}>{error.debitamount}</p>}

          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}} variant="danger" onClick={()=>setModalShowUpdt(false)}>Close</Button>
         <Button style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}} variant="success" onClick={Tblupdate} >Update</Button>

      </Modal.Footer>
    </Modal>
 
        

        

        </>
    )
}