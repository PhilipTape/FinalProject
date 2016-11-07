import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Panel,Modal
} from 'react-bootstrap';


class App extends Component {


    state = {
        name: "",
        rate: "",
        fastfood: [],
        gender: "",
        records:[],
        suggestion:"",
        age:"",
        date:"",
        mm:"",
        dd:"",
        yy:"",
        show: false,
        selectedName:"",
        selectedRate:"",
        selectedFastfood:"",
        selectedGender:"",
        selectedRecords:[],
        selectedSuggestion:"",
        selectedAge:"",
        selectedDate:"",
        selectedMm:"",
        selectedDd:"",
        selectedYy:"",
        selectedId:""
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

 modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };
    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };
modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedFastfood;
            state[fieldName] = targetArray;
            this.setState(state.selectedFastfood);
        }
    };

    saveSurvey = ()=> {

        var data = {name: this.state.name,
                    rate: this.state.rate,
                    fastfood: this.state.fastfood,
                    gender: this.state.gender,
                    suggestion: this.state.suggestion,
                    age: this.state.age,
                    date: this.state.date,
                    mm: this.state.mm,
                    dd: this.state.dd,
                    yy: this.state.yy};



                    console.log(data);
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {
                    console.log('delete');
                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };

editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        rate: data.rate,
                       fastfood: data.fastfood,
                        gender: data.gender,
                        suggestion: data.suggestion,
                        age: data.age,
                        date: data.date,
                        mm: data.mm,
                        dd: data.dd,
                        yy: data.yy
                        

                    })
                }).catch((error)=>{
                    
                });
        };
    };

 openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedName: data.name,
                        selectedRate: data.rate,
                        selectedFastfood: data.fastfood,
                        selectedGender: data.gender,
                        selectedSuggestion: data.suggestion,
                        selectedAge: data.age,
                        selectedDate: data.date,
                        selectedMm: data.mm,
                        selectedDd: data.dd,
                        selectedYy: data.yy,
                        selectedId: data.id



                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };

    

    saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {name: this.state.selectedName,
                        rate: this.state.selectedRate,
                        fastfood: this.state.selectedFastfood,
                        gender: this.state.selectedGender,
                        suggestion: this.state.selectedSuggestion,
                       age: this.state.selectedAge,
                        date: this.state.selectedDate,
                        mm: this.state.selectedMm,
                        dd: this.state.selectedDd,
                        yy: this.state.selectedYy};
                        
                       
            delete data.records;

 
    


            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
               selectedName:"",
        selectedRate:"",
        selectedFastfood:"",
        selectedGender:"",
        selectedRecords:[],
        selectedSuggestion:"",
        selectedAge:"",
        selectedDate:"",
        selectedMm:"",
        selectedDd:"",
        selectedYy:""
      


                
            });
        }
    };





    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td><Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>Delete</Button>
                     <Button  bsSize= "xsmall" bsStyle="warning" onClick={this.openModal(item.id)}>Edit</Button></td>
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                     <td>{item.rate}</td>
                     <td>{
                         item.fastfood.map((fastfood, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-success">{fastfood}</span>
                                 </div>
                         })

                      }
                     </td>
                     <td>{item.gender}</td>
                     <td>{item.age}</td>
                     <td>{item.mm} {item.dd},{item.yy}</td>

                     <td className="textfieldarea">{item.suggestion}</td>
                
                </tr>
            );
        });

let close = () => this.setState({ show: false})

        return (
            <div className="conTainer">
            
                <div className="page-header">
                    <div className="todoAppHeader"> FASTFOOD CUSTOMER SURVEY © 2016</div>
                </div>
                <div className="jumbotron">
                    <Grid>
                        <Row>
                            <Col md={6}>
                                <Form>
                                <Panel>
                                    <FormGroup>
                                        <ControlLabel><h2>Personal Information:</h2></ControlLabel>
                                        <FormControl
                                            type="text" 
                                            placeholder="Name here.."
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />
                                        <HelpBlock>Your information is valuable to us.</HelpBlock>
                                    </FormGroup>
                                    
                                    </Panel>
                                    <Panel>
                                    <FormGroup>
                                        <ControlLabel><h2>How is the dinning area, decor, lightning, music and overall ambience?</h2></ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="Rate us:"
                                                     value={this.state.rate}
                                                     onChange={this.onChange('rate')}
                                            >
                                           <option selected disabled>✓ Choose here</option>
                                            <option value="👎 DISSATISFIED">👎 DISSATIFIED</option>
                                            <option value="☺ AVERAGE">☺ AVERAGE</option>
                                            <option value="☺ GOOD">☺ GOOD</option>
                                            <option value="★★VERY GOOD">★★VERY GOOD</option>
                                            <option value="★★★EXCELLENT!">★★★EXCELLENT!</option>
                                         

                                        </FormControl>
                                        <HelpBlock>Use to rate our company:</HelpBlock>
                                    </FormGroup>
                                    </Panel>
                                    <Panel>
                                    <FormGroup>
                                        <ControlLabel><h2>Favorite FastFood:</h2></ControlLabel>
                                        <Checkbox value="Jollibee"
                                                  checked={this.state.fastfood.indexOf('Jollibee')>=0 ? true:false}
                                                  onChange={this.checkboxChange('fastfood')}>
                                            Jollibee
                                        </Checkbox>
                                        <Checkbox value="KFC"
                                                  checked={this.state.fastfood.indexOf('KFC')>=0 ? true:false}
                                                  onChange={this.checkboxChange('fastfood')}>
                                            KFC
                                        </Checkbox>
                                        <Checkbox value="Chowking"
                                                  checked={this.state.fastfood.indexOf('Chowking')>=0 ? true:false}
                                                  onChange={this.checkboxChange('fastfood')}>
                                            Chowking
                                        </Checkbox>

                                            <Checkbox value="PizzaHut"
                                                  checked={this.state.fastfood.indexOf('PizzaHut')>=0 ? true:false}
                                                  onChange={this.checkboxChange('fastfood')}>
                                            PizzaHut
                                        </Checkbox>

                                          <Checkbox value="Greenwich"
                                                  checked={this.state.fastfood.indexOf('Greenwich')>=0 ? true:false}
                                                  onChange={this.checkboxChange('fastfood')}>
                                               Greenwich
                                        </Checkbox>

                                        <Checkbox value="McDonalds"
                                                  checked={this.state.fastfood.indexOf('McDonalds')>=0 ? true:false}
                                                  onChange={this.checkboxChange('fastfood')}>
                                            McDonalds
                                        </Checkbox>

                                    </FormGroup>
                                    </Panel>
                                    <Panel>
                                  <FormGroup>
                                        <ControlLabel><h2>Gender:</h2> </ControlLabel>
                                        <Radio name="gender" value="♂ Male"
                                               onChange={this.onChange('gender')}>Male</Radio>
                                        <Radio name="gender" value="♀ Female"
                                               onChange={this.onChange('gender')}>Female</Radio>
                                    </FormGroup>

</Panel>
<Panel>
   <FormGroup>
                                        <ControlLabel><h2>How old are you?</h2></ControlLabel>
                                        <Radio name="age" value="Below 18"
                                               onChange={this.onChange('age')}>Below 18</Radio>
                                        <Radio name="age" value="18-25"
                                               onChange={this.onChange('age')}> 18-25</Radio>
                                        <Radio name="age" value="26-34"
                                               onChange={this.onChange('age')}> 26-34</Radio>
                                                   <Radio name="age" value="35-54"
                                               onChange={this.onChange('age')}> 35-54</Radio>
                                                   <Radio name="age" value="55-64"
                                               onChange={this.onChange('age')}> 55-64</Radio>
                                                     <Radio name="age" value="60 +older"
                                               onChange={this.onChange('age')}> 60 +older</Radio>





                                    </FormGroup>
                                    </Panel>
<Panel>
<FormGroup>
                                        <ControlLabel><h2>Date:</h2></ControlLabel>
                                        
                                      <table><tr><th>  
                                         <FormControl componentClass="select"
                                                     placeholder="Color here..."
                                                     value={this.state.mm}
                                                     onChange={this.onChange('mm')}
                                            >
                                            
                                    
                                            <option value="0" selected="1">Month</option>
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option></FormControl> </th>
                                        
                                        
                                        <th>
                                         <FormControl componentClass="select"
                                                     value={this.state.dd}
                                                     onChange={this.onChange('dd')}
                                            >
                                            <option value="0" selected="01">Day</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                        </FormControl></th>
                                        <th>
                                        <FormControl componentClass="select"
                                                     placeholder="MONTH here..."
                                                     value={this.state.yy}
                                                     onChange={this.onChange('yy')}
                                            >
                                        <option value="0" selected="1">Year</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option></FormControl>
                                        </th></tr></table>
                                        <HelpBlock>Identify the date today!</HelpBlock>
                                    </FormGroup>
                                        </Panel>






                                        <Panel>
                                 <FormGroup>
                                        <ControlLabel><h2>Any comments or suggestions? Feel free to tell us:</h2></ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Whats on your mind?"
                                            value={this.state.suggestion}
                                            onChange={this.onChange('suggestion')}
                                            cols="70" 
                                            rows="7"
                                            />
                                    </FormGroup>
                                    </Panel>


                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveSurvey}>Submit</Button>

                                    </ButtonGroup>
                                </Form>
                            </Col>
                            <Col md={6}>
                           
                                <Table condensed striped bordered hover>
                                    <thead>
                                    <tr>
                                    
                                        <th>Action</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Rate Of Company</th>
                                        <th>Fav. Fastfood</th>
                                        <th>Gender</th>
                                        <th>Age</th>
                                        <th>Date</th>
                                        <th>Comments</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                              
                            </Col>
                        </Row>
                    </Grid>

                </div>
          <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title" >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit Your Information:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                   <Form>
                                <Panel>
                                    <FormGroup>
                                        <ControlLabel>Personal Information:</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Name here.."
                                            value={this.state.selectedName}
                                            onChange={this.modalonChange('selectedName')}
                                            />
                                        <HelpBlock>Your information is valuable to us.</HelpBlock>
                                    </FormGroup>
                                    </Panel>
                                    <Panel>
                                    <FormGroup>
                                        <ControlLabel>How is the dinning area, decor, lightning, music and overall ambience?</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="Rate us:"
                                                     value={this.state.selectedRate}
                                                     onChange={this.modalonChange('selectedRate')}
                                            >
                                           <option selected disabled>✓ Choose here</option>
                                            <option value="👎 DISSATISFIED">👎 DISSATIFIED</option>
                                            <option value="☺ AVERAGE">☺ AVERAGE</option>
                                            <option value="☺ GOOD">☺ GOOD</option>
                                            <option value="★★VERY GOOD">★★VERY GOOD</option>
                                            <option value="★★★EXCELLENT!">★★★EXCELLENT!</option>
                                         

                                        </FormControl>
                                        <HelpBlock>Use to rate our company:</HelpBlock>
                                    </FormGroup>
                                    </Panel>
                                    <Panel>
                                    <FormGroup>
                                        <ControlLabel>Favorite FastFood:</ControlLabel>
                                        <Checkbox value="Jollibee"
                                                  checked={this.state.selectedFastfood.indexOf('Jollibee')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedFastfood')}>
                                            Jollibee
                                        </Checkbox>
                                        <Checkbox value="KFC"
                                                  checked={this.state.selectedFastfood.indexOf('KFC')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedFastfood')}>
                                            KFC
                                        </Checkbox>
                                        <Checkbox value="Chowking"
                                                  checked={this.state.selectedFastfood.indexOf('Chowking')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedFastfood')}>
                                            Chowking
                                        </Checkbox>

                                            <Checkbox value="PizzaHut"
                                                  checked={this.state.selectedFastfood.indexOf('PizzaHut')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedFastfood')}>
                                            PizzaHut
                                        </Checkbox>

                                          <Checkbox value="Greenwich"
                                                  checked={this.state.selectedFastfood.indexOf('Greenwich')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedFastfood')}>
                                            Greenwich
                                        </Checkbox>

                                        <Checkbox value="McDonalds"
                                                  checked={this.state.selectedFastfood.indexOf('McDonalds')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedFastfood')}>
                                            McDonalds
                                        </Checkbox>

                                    </FormGroup>
                                    </Panel>
                                    <Panel>
                                  <FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="selectedGender" value="♂ Male"
                                        
                                               onChange={this.modalonChange('selectedGender')}>Male</Radio>
                                        <Radio name="selectedGender" value="♀ Female"
                                               onChange={this.modalonChange('selectedGender')}>Female</Radio>
                                    </FormGroup>

</Panel>
<Panel>
   <FormGroup>
                                        <ControlLabel>How old are you?</ControlLabel>
                                        <Radio name="selectedAge" value="Below 18"
                                               onChange={this.modalonChange('selectedAge')}>Below 18</Radio>
                                        <Radio name="selectedAge" value="18-25"
                                               onChange={this.modalonChange('selectedAge')}> 18-25</Radio>
                                        <Radio name="selectedAge" value="26-34"
                                               onChange={this.modalonChange('selectedAge')}> 26-34</Radio>
                                                   <Radio name="selectedAge" value="35-54"
                                               onChange={this.modalonChange('selectedAge')}> 35-54</Radio>
                                                   <Radio name="selectedAge" value="55-64"
                                               onChange={this.modalonChange('selectedAge')}> 55-64</Radio>
                                                     <Radio name="selectedAge" value="60 +older"
                                               onChange={this.modalonChange('selectedAge')}> 60 +older</Radio>





                                    </FormGroup>
                                    </Panel>
<Panel>
<FormGroup>
                                        <ControlLabel>Date</ControlLabel>
                                        
                                      <table><tr><th>  
                                         <FormControl componentClass="select"
                                                     placeholder="Color here..."
                                                     value={this.state.selectedMm}
                                                     onChange={this.modalonChange('selectedMm')}
                                            >
                                            
                                    
                                            <option value="0" selected="1">Month</option>
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option></FormControl> </th>
                                        
                                        
                                        <th>
                                         <FormControl componentClass="select"
                                                     value={this.state.selectedDd}
                                                     onChange={this.modalonChange('selectedDd')}
                                            >
                                            <option value="0" selected="01">Day</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                        </FormControl></th>
                                        <th>
                                        <FormControl componentClass="select"
                                                     placeholder="MONTH here..."
                                                     value={this.state.selectedYy}
                                                     onChange={this.modalonChange('selectedYy')}
                                            >
                                        <option value="0" selected="1">Year</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option></FormControl>
                                        </th></tr></table>
                                        <HelpBlock>Identify the date today!</HelpBlock>
                                    </FormGroup>
                                        </Panel>


                                        <Panel>
                                 <FormGroup>
                                        <ControlLabel>Any comments or suggestions? Feel free to tell us</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Tell us what you think..."
                                            value={this.state.selectedSuggestion}
                                            onChange={this.modalonChange('selectedSuggestion')}
                                            cols="65" 
                                            rows="5"
                                            />

                                             
                                    </FormGroup>
                                    </Panel>
                                
</Form>
<ButtonGroup>
                                                    
                                         <Button bsStyle="primary" onClick={this.saveEdit(this.state.selectedId)}>Submit</Button>

                                                </ButtonGroup>

                            </Modal.Body>
                        </Modal>
                        </div>
            </div>
            
            
        );
    }
}

export default App;
