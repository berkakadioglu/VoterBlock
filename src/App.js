import React from "react";

// 1. Importing other modules
import {GetWeb3, GetContract, GetAccount} from './BlockchainUtil';

// 1. Importing other modules
import { BrowserRouter as Router, Route, Link, Navigate, Routes, BrowserRouter } from "react-router-dom";
import CreateElection from "./CreateElection"
import ActiveElections from "./ActiveElections";
import contractJson from './build/contracts/AllElections.json';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      account: null,
      mainInstance: null,
    };
  }

  componentDidMount() {
    sessionStorage.setItem('reloadCount', 0);
    this.init();
    console.log(sessionStorage.getItem('reloadCount'));
    if (sessionStorage.getItem('reloadCount') === 0){
      window.location = '/';
      sessionStorage.setItem('reloadCount', 1);
    }
    console.log(sessionStorage.getItem('reloadCount'));
  }

  componentWillUnmount(){
    localStorage.clear();
  }

  async init() {
    // 2. Load web3
    const Web3 = new GetWeb3();
    this.web3 = await Web3.getWeb3();
    this.setState({web3: this.web3});

    // 3. Load Account
    const Account = new GetAccount();
    this.account = await Account.getAccount(this.web3);
    this.setState({account: this.account[0]});

    // 4. Load Contract
    const Contract = new GetContract();
    this.mainInstance = await Contract.getContract(this.web3, contractJson);
    this.setState({mainInstance: this.mainInstance});    
  }

  render() {
    return <div>
      <BrowserRouter>
        <nav className="navbar navbar-dark shadow" style={{backgroundColor: "#1b2021", height: "60px", color: "white", marginBottom: "50px"}}>
            {/* Link to Active election page (nav-header) */}
            <Link to ="/active"><b style = {{cursor: "pointer", color: "white"}}>VoterBlock</b></Link>

            {/* Account address on the right side of the navbar  */}
            <span style={{float: "right"}}>{this.state.account}</span>
        </nav>
        <Routes>
          <Route path="/" element={ <Navigate to="/active"/>} exact/>
          {<Route path="/createElection" exact element={<CreateElection account={this.state.account}/>}/>}
          {<Route path="/active" exact element={<ActiveElections account={this.state.account}/>}/>}
        </Routes>
      </BrowserRouter>
    </div>;
  }
}
export default App;