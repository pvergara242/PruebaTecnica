import  { Component } from 'react';
import './App.css';
import axios from 'axios';
import {ModalBody, ModalFooter, Table} from 'reactstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
require('dotenv').config();

const url = (process.env.REACT_APP_API_HOST || "https://crudcrud.com/api/903af30c4e1b480da57b345fb79cc801") + "/mascotas/";

console.log('process.env.REACT_APP_API_HOST: ', process.env.REACT_APP_API_HOST);

class App extends Component {
  state = {
    data:[],
    modalInsertar: false,
    modalEliminar :false,
    form:{
      id:'',
      edad:'',
      nombre:'',
      especie:'',
      tipoModal: ''
    }
  }
  
  peticionGet(){
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
  }
  
  peticionPost=async () =>{
    await axios.post(url,this.state.form).then(response=>{
      this.modalAbrir();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }
  
  peticionPut = () =>{
    axios.put(url+this.state.form.id, this.state.form).then(response=>{
      this.modalAbrir();
      this.peticionGet();
    })
  }
  
  peticionDelete = () =>{
    axios.delete(url+this.state.form.id).then(response=>{
      this.setState({modalEliminar:false});
      this.peticionGet();
    })
  }
  
  seleccionarMascota = (mascota) =>{
    this.setState({
      tipoModal:'actualizar',
      form:{
        id: mascota._id,
        edad: mascota.edad,
        nombre:mascota.nombre,
        especie:mascota.especie
      }
    })
  }
  
  modalAbrir = () =>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.id] : e.target.value
      }
    });
  }
  
  modalInsertar = () =>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  componentDidMount(){
    this.peticionGet();
  }

  render(){
    return(
      <div className="App">
         <h1>Lista de Mascotas</h1>
        <br/>
        <Button variant="success" onClick={()=>{this.setState({form:null, tipoModal:'insertar'});this.modalAbrir()}}>Agregar Mascotas</Button>
       <br/><br/>
       <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>edad</th>
              <th>nombre</th>
              <th>especie</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((mascota, index)=>{
              return(
                <tr>
                <td>{index + 1}</td>
                <td>{mascota.edad}</td>
                <td>{mascota.nombre}</td>
                <td>{mascota.especie}</td>
                <td>{mascota.Acciones}<Button variant="primary" onClick={()=>{this.seleccionarMascota(mascota); this.modalInsertar()}}>Editar</Button>
                <Button variant="danger" onClick={()=>{this.seleccionarMascota(mascota); this.setState({modalEliminar:true})}}>Eliminar</Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        
        <Modal show={this.state.modalInsertar}>
         
            <Modal.Header >
              <Modal.Title>Registro de mascotas</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form.Group >
                <div className="form-group">
                  <label htmlFor="id">id</label>
                  <input className="form-control" type="text" name="id" id="id" readOnly  value={this.state.data.length+1}/>
                  <br/>
                  <label htmlFor="nombre">nombre</label>
                  <input   className="form-control" type="text" id="nombre" onChange={this.handleChange} value={this.state.form?this.state.form.nombre:''} />           
                  <br/>
                  <label htmlFor="edad">edad</label>
                  <input className="form-control" type="text" name="edad" id="edad" onChange={this.handleChange} value={this.state.form?this.state.form.edad:''}/>
                  <br/>
                  <label htmlFor="especie">especie</label>
                  <input className="form-control" type="text" name="especie" id="especie" onChange={this.handleChange} value={this.state.form?this.state.form.especie:''}/>
                  <br/>
                </div>
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
               {this.state.tipoModal === 'insertar' ?
              <Button variant="primary" onClick={()=>this.peticionPost()}>
                Insertar
                </Button>: <Button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                  Actualizar
                </Button>
               } 
              <Button variant="danger" onClick={()=>this.modalAbrir()}>Cancelar</Button>
            </Modal.Footer>
           
          </Modal>
          
          <Modal show={this.state.modalEliminar}>
            <ModalBody>
              Estas seguro que deseas eliminarlo {this.state.form && this.state.form.nombre}
            </ModalBody>
            <ModalFooter>
              <Button className="btn btn-danger" onClick={()=>this.peticionDelete()}>SI</Button>
              <Button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar:false})}>NO</Button>
            </ModalFooter>
          </Modal>
      </div>
    )
  }
  }


export default App;
