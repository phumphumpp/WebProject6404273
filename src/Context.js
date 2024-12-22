// Context.js
import React, { Component } from 'react';

// สร้าง context
const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    Alldata: JSON.parse(localStorage.getItem('Alldata')) || [],
    id: '',
    title: '',
    info: '',
    price: '',
    company: '',
  };

  // การอัพเดตข้อมูลใน state และ localStorage
  componentDidUpdate(prevProps, prevState) {
    if (prevState.Alldata !== this.state.Alldata) {
      localStorage.setItem('Alldata', JSON.stringify(this.state.Alldata));
    }
    if (
      prevState.title !== this.state.title ||
      prevState.info !== this.state.info ||
      prevState.price !== this.state.price ||
      prevState.company !== this.state.company
    ) {
      localStorage.setItem('title', this.state.title);
      localStorage.setItem('info', this.state.info);
      localStorage.setItem('price', this.state.price);
      localStorage.setItem('company', this.state.company);
    }
  }

  // ฟังก์ชันต่างๆ เช่น onEdit, onSave, onDelete
  getRecord = (id) => {
    return this.state.Alldata.find((item) => item.id === id);
  };

  onEdit = (id) => {
    const selectedRecord = this.getRecord(id);
    this.setState({
      id: selectedRecord.id,
      title: selectedRecord.title,
      info: selectedRecord.info,
      price: selectedRecord.price,
      company: selectedRecord.company,
    });
  };

  updateValue = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  onSave = (id) => {
    if (id !== '') {
      const updatedAlldata = this.state.Alldata.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: this.state.title,
            info: this.state.info,
            price: this.state.price,
            company: this.state.company,
          };
        }
        return item;
      });
      this.setState({
        Alldata: updatedAlldata,
        id: '',
        title: '',
        info: '',
        price: '',
        company: '',
      });
    } else {
      const newRow = {
        id: Date.now(),
        title: this.state.title,
        info: this.state.info,
        price: this.state.price,
        company: this.state.company,
      };
      this.setState({
        Alldata: [...this.state.Alldata, newRow],
        title: '',
        info: '',
        price: '',
        company: '',
      });
    }
  };

  onDelete = (id) => {
    const filteredAlldata = this.state.Alldata.filter((item) => item.id !== id);
    this.setState({ Alldata: filteredAlldata });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          onEdit: this.onEdit,
          updateValue: this.updateValue,
          onSave: this.onSave,
          onDelete: this.onDelete,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

// การส่งออกเพื่อให้ใช้ในไฟล์อื่นๆ
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
