import { updateUserAccount } from '@/Functions'
import React, { Component } from 'react'
import Uploader from '../Includes/Uploader/Uploader'
import { api_url, getJwt } from '@/Constants'
import CountrySelect from '../Includes/CountrySelect/CountrySelect'
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Alert, Slide } from '@mui/material'

class AddInvestmentAmountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: this.props.constants.loansInformation.minimumInvestMentAmount, // Default amount
      duration: 3, // Default duration in months
      projectedReturns: 0,
      country: 'Zambia',
      currency: 'ZMK',
      isCompany: false,
      InvestmentProfileId: null,
      certificateOfIncorperation: null,
      isLargeInvestment: false,
      isFormValid: false,
      interestRate: this.props.constants.loansInformation.defaultInvestMentInterestRate,
      minimumInvestMentAmount: this.props.constants.loansInformation.minimumInvestMentAmount,
      threeMonthsMaximumInvestmentAmount: this.props.constants.loansInformation.threeMonthsMaximumInvestmentAmount,
      sixMonthsMaximumInvestmentAmount: this.props.constants.loansInformation.sixMonthsMaximumInvestmentAmount,
      nineMonthsMaximumInvestmentAmount: this.props.constants.loansInformation.nineMonthsMaximumInvestmentAmount,
      twelveMonthsMaximumInvestmentAmount: this.props.constants.loansInformation.twelveMonthsMaximumInvestmentAmount,
      threeMonthsMaximumInvestmentAmountInUSD: this.props.constants.loansInformation.threeMonthsMaximumInvestmentAmountInUSD,
      sixMonthsMaximumInvestmentAmountInUSD: this.props.constants.loansInformation.sixMonthsMaximumInvestmentAmountInUSD,
      nineMonthsMaximumInvestmentAmountInUSD: this.props.constants.loansInformation.nineMonthsMaximumInvestmentAmountInUSD,
      twelveMonthsMaximumInvestmentAmountInUSD: this.props.constants.loansInformation.twelveMonthsMaximumInvestmentAmountInUSD,
    }
  }


  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value }, this.calculateReturns)
  }

  checkFormValidity = () => {
     const { amount, country, certificateOfIncorperation } = this.state;
     const isFormValid = amount && country && certificateOfIncorperation;
     this.setState({ isFormValid:isFormValid})
  }


  handleCountryChange = (country) => {
    const currency = country === 'Zambia' ? 'ZMK' : 'USD'
    const interestRate =  country === 'Zambia' ? this.state.interestRate : this.props.constants.loansInformation.defaultUSDInvestMentInterestRate // means we have to use the usd client interate rate
    const amount =  country === 'Zambia' ? this.state.amount : this.props.constants.loansInformation.minimumInvestMentAmountInUSD // means we have to use the usd client minimum amount
    this.setState({ country, currency, interestRate, amount }, this.calculateReturns)
  }

  handleCompanyToggle = (isCompany) => {
    this.setState({ isCompany: isCompany })
  }

  calculateReturns = () => {
    const { amount, interestRate, duration } = this.state
    const principal = parseFloat(amount)
    const rate = parseFloat(interestRate) / 100
    const time = parseFloat(duration) / 12 // Convert months to years
    const returns = principal * Math.pow(1 + rate, time) - principal

    const isLargeInvestment =
      (this.state.currency === 'ZMK' && amount > 500000) ||
      (this.state.currency === 'USD' && amount > 20000)

    this.setState({ projectedReturns: returns.toFixed(2), isLargeInvestment })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    alert(`Investment successfully saved!\nAmount: ${this.state.amount} ${this.state.currency}\nDuration: ${this.state.duration} months\nProjected Returns: ${this.state.projectedReturns}`)
  }

  renderMaximumInvestMentPeriod = (amount,country)=>{
    const threeMonthsMaximumInvestmentAmount = country === "Zambia"? this.state.threeMonthsMaximumInvestmentAmount : this.state.threeMonthsMaximumInvestmentAmountInUSD
    const sixMonthsMaximumInvestmentAmount = country === "Zambia"? this.state.sixMonthsMaximumInvestmentAmount :  this.state.sixMonthsMaximumInvestmentAmountInUSD
    const nineMonthsMaximumInvestmentAmount = country === "Zambia"? this.state.nineMonthsMaximumInvestmentAmount : this.state.nineMonthsMaximumInvestmentAmountInUSD
    const twelveMonthsMaximumInvestmentAmount = country === "Zambia"? this.state.twelveMonthsMaximumInvestmentAmount : this.state.twelveMonthsMaximumInvestmentAmountInUSD
    
    if(parseFloat(amount) < parseFloat(threeMonthsMaximumInvestmentAmount)){
        console.log(3)
        return 3
    }
    else if(parseFloat(amount) < parseFloat(sixMonthsMaximumInvestmentAmount)){
        console.log(6)
        return 6
    }
    else if(parseFloat(amount) < parseFloat(nineMonthsMaximumInvestmentAmount)){
        console.log(9)
        return 9
    }
    else if(parseFloat(amount) < parseFloat(twelveMonthsMaximumInvestmentAmount)){
        console.log(12)
        return 12
    }
    else if(parseFloat(amount) > parseFloat(twelveMonthsMaximumInvestmentAmount)){
        console.log(60)
        return 60
    }
    console.log(threeMonthsMaximumInvestmentAmount)
    return 1
  }
  getInvestmentProfile =  async()=>{
    return await fetch(api_url+'/users/me?populate=InvestmentProfile.certificateOfIncorperation', {
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => data)
  }

   addCertificateOfIncorperation = (files) => {
      if(!this.state.certificateOfIncorperation){
          this.setState({
              certificateOfIncorperation: files,
              saving: false,
              error: null
          },()=>{
              this.checkFormValidity()
          })
      }
      else{
          const newFiles = [...this.state.certificateOfIncorperation,...files]
          this.setState({
              certificateOfIncorperation: newFiles,
              saving: false,
              error: null
          },()=>{
              this.checkFormValidity()
          })
      }
    }

    handleRemoveImage = async (uploadid,filesArr,arrName)=>{
        const removed = await fetch(api_url+'/upload/files/'+uploadid,{
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getJwt()}`,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(data => data)
          .catch(error => console.error(error))
         if(removed){
           // remove from state
           const newArray = filesArr.filter((file)=>{
               return file.id !== uploadid
           })
           this.setState({
            [arrName]: newArray.length < 1? null : newArray
           },()=>{
            this.checkFormValidity()
           })
           // remove from the dom
           if(typeof document !== 'undefined'){
             document.getElementById("#"+uploadid).style.display = "none"
           }
         } 
      }

   renderFiles = (files,arrName)=>{
       if(!files){
           return <></>
       }
       return files.map((file)=>{
           if(file.hasOwnProperty("attributes")){
               file.attributes.id = file.id
               file = file.attributes
           }
           if(file.mime.startsWith('application/')){
               return (<div id={"#"+file.id} key={file.id}>
                           <p>File: <strong>{file.name}</strong></p>
                           <button className="btn btn-sm btn-danger" onClick={(e)=>{e.preventDefault(); this.handleRemoveImage(file.id,files,arrName);}}>Remove</button>
                      </div>)
           }
           else if(file.mime.startsWith('video/')){
               return (<div id={"#"+file.id} key={file.id}>
                           <div style={{width:'50%', backgroundColor:'lightgray'}}>
                               <video className="mb-1" style={{width:'100%'}}>
                                   <source src={backEndUrl + file.url} type={file.mime} />
                                   Sorry we are unable to show this video
                               </video>
                           </div>
                           <button className="btn btn-sm btn-danger" onClick={(e)=>{e.preventDefault(); this.handleRemoveImage(file.id,files,arrName);}}>Remove</button>
                      </div>)
                      
           }
           else{
               return (<div id={"#"+file.id} key={file.id}>
                         <p className="text text-warning">File failed to be displayed</p>
                         <button className="btn btn-sm btn-danger" onClick={(e)=>{e.preventDefault(); this.handleRemoveImage(file.id,files,arrName);}}>Remove</button>
                      </div>)
           }
       })
     }
      

  async componentDidMount() {
      this.calculateReturns()
      let { InvestmentProfile } = this.props.loggedInUser // because the user object has the client details, though no nrc
      console.log(InvestmentProfile)
      if(!InvestmentProfile){
          const blankInvestmentProfile = {
              clientType: null,
              country: null,
              certificateOfIncorperation: null
          } // create a blank slate of InvestmentProfile details to obtain the component's id
          const updatedUser = await updateUserAccount({InvestmentProfile:blankInvestmentProfile},this.props.loggedInUser.id)
          if(updatedUser.hasOwnProperty('error')){
              return
          }
      }
      const user = await this.getInvestmentProfile();
      InvestmentProfile = user.InvestmentProfile
      // Set default values, ensure nulls are handled
      // Set default values, ensure nulls are handled
      this.setState({
        certificateOfIncorperation: InvestmentProfile?.certificateOfIncorperation || '',
        InvestmentProfileId: InvestmentProfile?.id || null
      },()=>{
          this.checkFormValidity(true)
      })
    }
  

  render() {
    const {
      amount,
      interestRate,
      duration,
      projectedReturns,
      country,
      currency,
      isCompany,
      isLargeInvestment,
    } = this.state

    return (
        <Slide in={true} direction="left">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Create your investment profile</h4>
              </div>
              <div className="card-body">
              <Box sx={{ marginBottom: '5px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'light' }} gutterBottom>
                        Are you investing as a company?
                    </Typography>
                    <RadioGroup
                        name="isCompany"
                        value={isCompany ? 'yes' : 'no'} // Default to 'no'
                        onChange={(event) => this.handleCompanyToggle(event.target.value === 'yes')}
                        row
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                </Box>
                {isCompany && this.state.InvestmentProfileId?  <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                    <h5>Certification Of Incorperation<small  style={{color:'gray'}}></small></h5>
                                    <Uploader 
                                        addFiles={this.addCertificateOfIncorperation}
                                        displayType="circular"
                                        refId={this.state.InvestmentProfileId}
                                        refName="client-details.investment-profile"
                                        fieldName="certificateOfIncorperation"
                                        allowMultiple={false}
                                        allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                                    />
                                    <small  style={{color:'lightgray'}}>(document(PDF,WORD))</small>
                                    {this.renderFiles(this.state.certificateOfIncorperation,"certificateOfIncorperation")}
                                </div> : <></>
                    }
                <CountrySelect setCountry={this.handleCountryChange}/>
                    <div className="form-group">
                    <label htmlFor="amount">Investment Amount ({currency})</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        className="form-control"
                        value={amount}
                        onChange={this.handleChange}
                        min="1000"
                        step="100"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="duration">Duration (months)</label>
                    <small>  Note that to invest for a longer period of time, you can invest a larger amount</small>
                    <input
                        type="range"
                        id="duration"
                        name="duration"
                        className="form-range"
                        value={duration}
                        onChange={this.handleChange}
                        min="1"
                        max={this.renderMaximumInvestMentPeriod(amount,country)}
                        step="1"
                    />
                    <span>{duration} months</span>
                    </div>

                    {isLargeInvestment && (
                        <Alert severity="info" sx={{marginBottom:'5px'}}>
                            <div className="form-group alert alert-info">
                                <strong>Note:</strong> For investments above {country === "Zambia"? "500,000 ZMK" : "20,000"} USD,
                                please contact us at <a href="tel:+260979460045">+260979460045</a> via a direct call or via whatsapp to negotiate
                                your interest rate.
                            </div>
                     </Alert>
                    )}
                    <Alert severity="success" sx={{marginBottom:'5px'}}>
                        <h6>Projected Returns: <strong>{currency} {parseFloat(projectedReturns)}</strong></h6>
                        <h6>Amount to Invest: {currency} {parseFloat(amount)}</h6>
                        <h6>Duration Of Investment {duration} months</h6>
                        <h6>At <strong>{interestRate}%</strong> Interate Rate</h6>
                      </Alert>
                    <button disabled={isLargeInvestment} type="submit" className="btn btn-primary">
                    Save Investment
                    </button>
                </div>
              </div>
            </div>
          </div>
        </Slide>
    )
  }
}

export default AddInvestmentAmountForm
