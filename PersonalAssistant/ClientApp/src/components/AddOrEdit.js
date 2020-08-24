import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const AddOrEdit = (props) => {
    const { translate, title, fieldsInfo } = props;
    const [values, setValues] = React.useState(fieldsInfo.map(e => e.value));
    let fields = fieldsInfo.map((e, i)=>
        <Grid key={i} item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
                {e.title}
            </Typography>
            <CustomInput fieldInfo={e} setValues={setValues} values={values} index={i} />
        </Grid>);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h3" gutterBottom>
                    {title}
                </Typography>
            </Grid>
            {fields}
        </Grid>
    );

}

const mapStateToProps = store => ({
    translate: {
        currentAsset: store.lang.translation.accountManager.CurrentAsset,
        expenditure30Days: store.lang.translation.accountManager.Expenditure30Days,
        avgDailyExpenditure: store.lang.translation.accountManager.AvgDailyExpenditure,
    }
});
export default connect(mapStateToProps)(AddOrEdit);