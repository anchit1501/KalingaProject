import React, { Component } from 'react';
import AirportList from './AirportList';
import Autosuggest from 'react-autosuggest';
import '../css/AirportInputResultPage.css';
import PopularCities from './PopularCities';


var languages=AirportList;

function escapeRegexCharacters(str) {

  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {

  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [...PopularCities];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.location) || regex.test(language.iata_code));
}

function getSuggestionValue(suggestion) {
  if(suggestion=='')
    return '';
  return suggestion.location+' ('+suggestion.iata_code+')' ;
}

function renderSuggestion(suggestion) {
  return (
    <span>{`${suggestion.location} (${suggestion.iata_code})-${suggestion.airport}`}</span>
  );
}

class AirportInput extends Component {
     constructor(props) {
    super(props);
    // console.log(this.props.value);
    this.state = {
      value: "",
      suggestions: [],
      
    }
  }
  renderInputComponent = inputProps => (
  <div>
    <input {...inputProps} id={this.props.id} style={{color:'white'}} />
    
  </div>
  );
  clearInput=(event)=>{
      if(event.target.value=='')
      {
          this.props.ClearCity(this.props.source);
        
      }
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
    
    this.props.changeValue(newValue);
    if(event.target.value=='')
    {
        this.props.ClearCity(this.props.source);
    }
    if(method==='down'||method==='up')
    {
    let suggestion=AirportList.find((ele)=>{
      if(ele.iata_code==newValue.substring(newValue.length-4, newValue.length-1))
      {

        return true;
      }
    });
    // console.log(suggestion);




    this.props.changeLocation(suggestion,this.props.source);
    }
    
  }
  onSuggestionSelected=(event,suggestion)=>{
    // console.log(this.props);
        this.props.changeLocation(suggestion.suggestion,this.props.source);
    
    this.props.changeValue(getSuggestionValue(suggestion.suggestion));
    this.props.changeStoreValue(getSuggestionValue(suggestion.suggestion));
    
  }
   onSuggestionHighlighted=({suggestion})=>{
    // console.log(suggestion);
    if(suggestion!=null)
    {
      this.props.changeLocation(suggestion,this.props.source);
    this.props.changeValue(getSuggestionValue(suggestion));
    this.props.changeStoreValue(getSuggestionValue(suggestion));

    }
    
  }
  onSuggestionsFetchRequested = ({ value }) => {
      // console.log(this.state.suggestions);
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  render() {
    // console.log(this.props);  
      const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: this.props.placeholder,
      value:this.props.oneway_value,
      onChange: this.onChange};
      let theme={
  container:                'react-autosuggest__container',
  containerOpen:            'react-autosuggest__container--open',
  input:                    'form-control',
  inputOpen:                'react-autosuggest__input--open',
  inputFocused:             'react-autosuggest__input--focused',
  suggestionsContainer:     'react-autosuggest__suggestions-container',
  suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
  suggestionsList:          'react-autosuggest__suggestions-list',
  suggestion:               'react-autosuggest__suggestion',
  suggestionFirst:          'react-autosuggest__suggestion--first',
  suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
  sectionContainer:         'react-autosuggest__section-container',
  sectionContainerFirst:    'react-autosuggest__section-container--first',
  sectionTitle:             'react-autosuggest__section-title'
}

    return (
       <Autosuggest 
        id={this.props.id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
        onSuggestionHighlighted={this.onSuggestionHighlighted}
        shouldRenderSuggestions={()=>value.trim().length >= 0} 
        renderInputComponent={this.renderInputComponent}/>
    );
  }
}

export default AirportInput;
