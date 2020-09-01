import React, { Component } from 'react';

import AddOrEditForm from '../AddOrEditForm';
import { HttpMethod } from '../../helper/GeneralConstants';
import { WebApi } from '../../helper/RouterConstants';

class EditDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            values: [],
            accountOptions: [],
            wayOptions: [],
            typeOptions: []
        };
        this.setValues = this.setValues.bind(this);
    }
    setValues(values){
        this.setState({values: values});
    }
    componentDidMount(){
        const { oidc } = this.props;
        oidc(HttpMethod.Get, WebApi.AccountInitializations).then(json => {
            this.setState({ accountOptions: json.map(e=>({label: e.Name, value: e.ID})) });
        });
        oidc(HttpMethod.Get, WebApi.ExpenditureWays).then(json => {
            this.setState({ wayOptions: json.map(e=>({label: e.WayName, value: e.ID})) });
        });
        oidc(HttpMethod.Get, WebApi.ExpenditureTypes).then(json => {
            this.setState({ typeOptions: json.map(e=>({label: e.TypeName, value: e.ID})) });
        });
    }
    render(){
        const {accountOptions, wayOptions, typeOptions} = this.state;
        const fieldsInfo = [
            { label: 'EffectiveDate', type: inputType.datetime, required: true },
            { label: 'Account', type: inputType.select, required: true, selectOptions: accountOptions},
            { label: 'Amount', type: inputType.number, required: true },
            { label: 'Fees', type: inputType.number },
            { label: 'Remarks', type: inputType.text },
            { label: 'ExpenditureWay', type: inputType.select, required: true, selectOptions: wayOptions },
            { label: 'ExpenditureType', type: inputType.select, required: true, selectOptions: typeOptions }
        ];
        return <>
            
            <AddOrEditForm title={'Expenditure'} fieldsInfo={fieldsInfo} />
        </>;
    }
}

export default EditDialog;