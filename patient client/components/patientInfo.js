import React, { Component } from 'react'
import { Text, Header, View,Button, Card, CardItem, Content, Form, Left, Title, Body, Item, Icon, Input } from 'native-base';
import { Actions } from 'react-native-router-flux'
import PatientMiddleware from "../store/middlewares/patientMiddleware.js"


export default class PatientInfo extends Component {
 
    // delete(index) {
        
    //     // return dispatch(PatientMiddleware.asyncDeletePatient(index))
    //     this.props.deleteIndex(index)
    //     Actions.all_patient()
    //     }


    render() {

        // let abc = JSON.parse(this.props.value)
        console.log(this.props.deleteIndex, "patient info")
        let detail = this.props.value
        console.log(detail, "asds")
        return (
            <View style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Icon style={{color:'white'}} name="arrow-back" iconColor="white" onPress={() => Actions.all_patient()} />
                    </Left>
                    <Body>
                        <Title>
                            Patient Tracker
                        </Title>
                    </Body>

                </Header>
                <Content>
                    <Card>
                        <CardItem>
                            <Text style={{fontSize:30}}>Patient Detail</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{fontSize:20}}>Name :</Text>
                            </Left>
                            <Body>
                                <Text>{detail.name}</Text>
                            </Body>

                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{fontSize:20}}>Disease :</Text>
                            </Left>
                            <Body>
                                <Text>{detail.disease}</Text>
                            </Body>

                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{fontSize:20}}>Dr. Name :</Text>
                            </Left>
                            <Body>
                                <Text>Dr.{detail.doctorName}</Text>
                            </Body>

                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{fontSize:20}}>Date : </Text>
                            </Left>
                            <Body>
                                <Text>{detail.date}</Text>
                            </Body>

                        </CardItem>
                    </Card>
                    {/* <Button onPress={this.delete.bind(this)} bordered block>
                        <Text>
                            Delete
                        </Text>
                    </Button> */}
                </Content>
            </View>
        )
    }
}