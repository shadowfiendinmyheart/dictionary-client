import React from 'react';
import { Input, FormControl, VStack, Button, Icon } from 'native-base';
import { Entypo } from "@native-base/icons";

const RegistrationForm = () => {
    const [formData, setData] = React.useState({name: ''});
    const [errors, setErrors] = React.useState({});

    const validate = () => {
      if (formData.name === undefined) {
        setErrors({ ...errors,
          name: 'Name is required'
        });
        return false;
      } else if (formData.name.length < 3) {
        setErrors({ ...errors,
          name: 'Name is too short'
        });
        return false;
      }
  
      return true;
    };

    const onSubmit = () => {
        validate() ? console.log('Submitted') : console.log('Validation Failed');
      };

    return (
     <VStack width="90%" mx="3" maxW="300px">
      <FormControl isRequired>
        <FormControl.Label _text={{
        bold: true
      }}>Name</FormControl.Label>
        <Input placeholder="John" onChangeText={value => setData({ ...formData,
        name: value
      })} />
        <FormControl.HelperText _text={{
        fontSize: 'xs'
      }}>
          Name should contain atleast 3 character.
        </FormControl.HelperText>
        <FormControl.ErrorMessage _text={{
        fontSize: 'xs'
      }}>
          Error Name
        </FormControl.ErrorMessage>
      </FormControl>
      <Button 
        onPress={onSubmit} 
        mt="5" 
        colorScheme="cyan"
        leftIcon={<Icon as={Entypo} name="add-user" />} 
    >
        Submit
      </Button>
    </VStack>
    );
};

export default RegistrationForm;