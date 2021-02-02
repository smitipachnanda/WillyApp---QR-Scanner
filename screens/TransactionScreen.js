import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }

    getCameraPermissions = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            /* status===granted is true when the user has granted permission
            status=== granted is false if the user has not granted the permission
            */
           hasCameraPermissions: status === 'granted',
           buttonState:'clicked'
        })
    }

    handleBarCodeScanned = async({type,data})=>{
            this.setState({
                scanned:true,
                scannedData:data,
                buttonState:'normal'
            })
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scannedData;
        const buttonState = this.state.buttonState;

        if(buttonState === 'clicked' & hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned} />
            )
        }
        else if(buttonState === 'normal'){
        return(
            <View style={styles.container}>
                <Text style={styles.displayText}>Dummy QR Code output </Text>{
                hasCameraPermissions === true ? this.state.scannedData:'Request camera permission'}
                <TouchableOpacity style={styles.scanButton}
                onPress = {this.getCameraPermissions}>
                    <Text>Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1, 
            justifyContent:'center', 
            alignItems:'center'
        },
        displayText:{
            fontSize:15,
            textDecorationLine:'underline'
        },
        scanButton:{
            backgroundColor:'#2196F3',
            padding:10,
            margin:10
        },
        buttonText:{
            fontSize:20
        }
    }
)