import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import axios from 'axios'
import ImageResults from '../image-results/ImageResults'

class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        images: [],
        apiUrl: 'https://pixabay.com/api/',
        apiKey: '10525886-4fa03ab17ae9b207f00727f06'
    };

    OnTextChange = (e) => {
        const val = e.target.value;
        this.setState({[e.target.name]: val}, () => {
            if (val === '') {
                this.setState({images: []})
            }else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                    .then(res => this.setState({images: res.data.hits}))
                    .catch(err => console.log(err));
            }
        });
    };

    OnAmountChange = (e, index, value) => this.setState({amount: value});

    render() {
        console.log(this.state.images);
        return (
            <div>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.OnTextChange}
                    floatingLabelText="Search For Images"
                    fullWidth={true}
                />

                <SelectField
                    name="amount"
                    floatingLabelText='Amount'
                    value={this.state.amount}
                    onChange={this.OnAmountChange}
                >
                    <MenuItem value={5}  primaryText='5' />
                    <MenuItem value={10} primaryText='10'/>
                    <MenuItem value={15} primaryText='15'/>
                    <MenuItem value={30} primaryText='30'/>
                    <MenuItem value={50} primaryText='50'/>

                </SelectField>
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
            </div>
        );
    }
}

export default Search;