import { View, Text, StyleSheet, FlatList} from "react-native";
import {Image} from 'expo-image';
import { useEffect, useState } from "react";
import CountryEntity from "./entities/country-entities";

export default function HomePage(){

    const [countries, setCountries] = useState<CountryEntity[]> ([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
          };

          let countryList: CountryEntity[] = [];
          
          fetch("https://restcountries.com/v3.1/all", requestOptions)
            .then(response => response.json())
            .then(result => 
                result.map(item => {
                 countryList.push({
                   id: item.name.common,
                   name: item.name.common,
                   ptName: item.translation.por.common,
                   flagUrl: item.flags.svg,
                   capitalName: item.capital,
                   population: item.population,
                   continente: item.region,
                });

            })
           
           .catch(error => console.log('error', error))
            )

        setCountries(countryList);
    })

    return(
        <View style={styles.container}>
            <View>
            <Text style={{fontSize: 40, fontWeight:"600", marginBottom: 50}}> Lista Países</Text>
            </View>

            <FlatList
            renderItem={(country) =>
           
             <View style={styles.card}>
             <Image source={{uri: country.item.flagUrl}} style={styles.flag} />
            <View>
               <Text style={{fontSize: 25}}>{country.item.name}</Text>
               <Text style={{fontSize: 20, fontFamily:'italic'}}>{country.item.ptName}</Text>
               <Text style={{fontSize: 20}}>População:{country.item.population}</Text>
               <Text style={{fontSize: 20}}>Capital:{country.item.capitalName}</Text>
               <Text style={{fontSize: 20}}>Continente:{country.item.continente}</Text>
            </View>
            </View> 

             }
            data={countries}
            keyExtractor={item => item.id.toString()}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#87CEEB',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16
    },
    card: {
        aspectRatio: 3.7,
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        backgroundColor: '#fff',
        marginBottom: 16
    },
    flag: {
        width:70,
        height: 70,
        marginLeft: 18,
        marginRight: 18

    }
  });