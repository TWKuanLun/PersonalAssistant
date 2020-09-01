import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';

import authService from '../api-authorization/AuthorizeService';
import { HttpMethod, HttpHeader, ApplicationJson, CharsetUTF8 } from '../../helper/GeneralConstants';
import { WebApi } from '../../helper/RouterConstants';
import Loading from '../Loading';
import SharedTable from '../SharedTable';
import { inputType } from '../../helper/GeneralConstants';


const styles = {
    root: {
        width: '100vw',
    }
};

class Expenditure extends Component {
    static displayName = Expenditure.name;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            apiResult: [],
            values: [null,null,null,null,null,null,null,null,null]
        };
        let temp = {
            ID: null,
            OwnerID: null,
            EffectiveDate: null,
            AccountID: null,
            Account: null,
            Amount: null,
            Fees: null,
            Remarks: null,
            ExpenditureWayID: null,
            ExpenditureWay: null,
            ExpenditureTypeID: null,
            ExpenditureType: null
        };
        this.oidc = this.oidc.bind(this);
    }
    async oidc(method, controllerUrl, data) {
        const token = await authService.getAccessToken();
        let headers = {};
        if (token) {
            headers[HttpHeader.Authorization] = `Bearer ${token}`;
        }
        let jsonUTF8 = `${ApplicationJson};${CharsetUTF8}`;
        let url = WebApi.Expenditures;
        switch (method) {
            case HttpMethod.Post:
                headers[HttpHeader.Accept] = jsonUTF8;
                headers[HttpHeader.ContentType] = jsonUTF8;
                break;
            case HttpMethod.Put:
                headers[HttpHeader.ContentType] = jsonUTF8;
                url = `${url}/${data.ID}`;
                break;
            case HttpMethod.Delete:
                url = `${url}/${data.ID}`;
                break;
            case HttpMethod.Get:
                if(data){
                    url = `${url}/${data.ID}`;
                }
            default:
                break;
        };
        try{
            let response = await fetch(url, {
                method: method,
                body: !data ? undefined : JSON.stringify(data),
                headers: headers
            });
            let contentType = response.headers.get(HttpHeader.ContentType);
            if (contentType && contentType.includes(ApplicationJson)) {
                return response.json();
            }
            throw new TypeError(`${HttpMethod.Get} ${url} ${HttpHeader.ContentType}: ${contentType}`);
        }catch(error){
            console.error(error);
        }   
    }
    componentDidMount() {
        this.oidc(HttpMethod.Get, WebApi.Expenditures).then(json => {
            this.setState({ apiResult: json, loading: false });
        });
    }

    render() {
        const { apiResult, loading } = this.state;
        if (loading) {
            return <Loading />
        }
        
        const { controller, translate, classes } = this.props;
        
        const columnsInfo = [
            {
                headText: 'Effective Date',
                align: 'left',
                fieldName: 'EffectiveDate',
                type: 'date'
            },
            {
                headText: 'Account',
                align: 'right',
                fieldName: 'Account.Name'
            },
            {
                headText: 'Expenditure Way',
                align: 'right',
                fieldName: 'ExpenditureWay.WayName'
            },
            {
                headText: 'Expenditure Way',
                align: 'right',
                fieldName: 'ExpenditureType.TypeName'
            },
            {
                headText: 'Amount',
                align: 'right',
                fieldName: 'Amount',
                type: 'number'
            },
            {
                headText: 'Fees',
                align: 'right',
                fieldName: 'Fees',
                type: 'number'
            },
            {
                headText: 'Remarks',
                align: 'right',
                fieldName: 'Remarks'
            }
        ];
        const fieldsInfo = [
            { label: 'EffectiveDate', type: inputType.datetime, required: true },
            { label: 'Account', type: inputType.select, required: true, selectOptions: [{label: '', value: 0}]},
            { label: 'Amount', type: inputType.number, required: true },
            { label: 'Fees', type: inputType.number },
            { label: 'Remarks', type: inputType.text },
            { label: 'ExpenditureWay', type: inputType.select, required: true, selectOptions: [{label: '', value: 0}] },
            { label: 'ExpenditureType', type: inputType.select, required: true, selectOptions: [{label: '', value: 0}] }
        ];
        return (
            <Grid container direction='row' justify='flex-end' alignItems='flex-start'>
                <Grid item xs='auto'>
                    <IconButton size='small'>
                        <AddBoxIcon fontSize='inherit' />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <SharedTable data={apiResult} columnsInfo={columnsInfo} />
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = store => ({
    translate: {
    }
});
export default connect(mapStateToProps)(withStyles(styles)(Expenditure));