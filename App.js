import React, {Component}from 'react';
import { Alert, StyleSheet, Text ,View, AppRegistry, TextInput, TouchableHighlight } from 'react-native';
import StatusBar from 'StatusBar';
var config = {
    city : 'SanJose',
    units : 'imperial',
    lan : 'it',
    format : 'json',
    cityId : '',
    APPID : '52a8c9f0d2c08ed852a01c7f2f86558e'
  };

setLang = function(lang){
  config.lan = lang.tolowercase();
}

setCity = function(city){
    config.city = encodeURIComponent(city.toLowerCase());
}

setCityId = function(cityid){
    config.cityId = cityid;
};

setUnits = function(units){
    config.units = units.toLowerCase();
};

setAPPID = function(appid){
    config.APPID = appid;
};

getLang = function(){
    return config.lan;
};

getCity = function(){
    return config.city;
};

getCityId = function(){
    return config.cityId;
};

getAPPID = function(){
    return config.APPID;
};

getUnits = function(){
    return config.units;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      temp: '',
      pressure:'',
      humidity:''
    };
  }

  searchWeather() {
    var cityName = this.state.city;
    if(cityName == ''){
      Alert.alert('Please enter city');
    }
    setCity(cityName);
    let url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&APPID='+config.APPID+'&units=imperial';
    fetch(url,{
        method : 'get',
        headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        }
      })
    .then((response) => response.json())
    .then((responseJson) =>{
        var temp = responseJson.main.temp;
        var pressure = responseJson.main.pressure;
        var humidity = responseJson.main.humidity;
        this.setState({
          city: this.state.city,
          temp: temp,
          pressure: pressure,
          humidity: humidity
        });
        Alert.alert(this.state.city + ' : '+temp);
      })
    .catch(error => {
          console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.appContainer}>
      <View style={styles.titleView}>
      <Text style={styles.titleText}>Weather</Text>
      </View>
      <View style={styles.inputcontainer}>
        <TextInput  style={styles.input} placeholder="Type City!" onChangeText={(text) => this.setState({city:text})} value={this.state.city}/>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.searchWeather()}
          underlayColor='#dddddd'>
          <Text style={styles.btnText}>Search</Text>
        </TouchableHighlight>
      </View>
    </View>  
    );
  }
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    textAlign: 'center',
    flex: 2,
    fontSize: 20
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    backgroundColor: '#3772a3',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
});

AppRegistry.registerComponent('App', () => App);