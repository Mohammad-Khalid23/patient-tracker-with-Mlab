import React, { Component } from 'react'
import { AsyncStorage, Alert } from 'react-native'
import { Text, Header, View, Content, Form, Left, Title, Body, Item, Icon, Input, Label, Button } from 'native-base';
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
export default class AddPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            disease: '',
            doctorName: '',
            date: '',
            isEmpty: false
        };
    }
    Info() {
        info = {
            name: this.state.name,
            disease: this.state.disease,
            doctorName: this.state.doctorName,
            date: this.state.date
        }
        if (this.state.name === "" || this.state.disease === "" || this.state.doctorName === "" || this.state.date === "") {
            this.setState({
                isEmpty: true
            })

        } else {
            this.props.patientInfo(info)
            Actions.all_patient()
            console.log(info, "add patient")
        }

    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Icon style={{ color: 'white' }} name="arrow-back" iconColor="white" onPress={() => Actions.all_patient()} />
                    </Left>
                    <Body>
                        <Title>
                            Patient Tracker
                        </Title>
                    </Body>

                </Header>
                <Form>
                <View>
                        {this.state.isEmpty ? <Text style={{ color: "red" }}>*fill the complete fields..</Text>
                            : null

                        }
                    </View>
                    <Item floatingLabel>
                        <Label >Patient Name</Label>
                        <Input onChangeText={(name) => this.setState({ name })} />
                    </Item>


                    <Item floatingLabel>
                        <Label>Disease</Label>
                        <Input onChangeText={(disease) => this.setState({ disease })} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Dr.Name</Label>
                        <Input onChangeText={(doctorName) => this.setState({ doctorName })} />
                    </Item>
                    <DatePicker onDateChange={(date) => { this.setState({ date: date }) }}
                        cancelBtnText="Cancel"
                        format="YYYY-MM-DD"
                        minDate="2017-08-29"
                    />
                    <Button onPress={this.Info.bind(this)} primary block>
                        <Icon name="ios-people" />

                        <Text>Add Patient</Text>
                    </Button>
                </Form>
            </View>

        )
    }



}
