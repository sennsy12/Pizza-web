import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table, Button, Modal, Form, Row, Col, InputGroup, Badge, Dropdown } from 'react-bootstrap';
import {
  fetchAdminMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../handlers/menuHandler';
import ImagePreview from './ImagePreview';

const AdminMenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: '', name: '', description: '', img: '', price: '', category: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Appetizers', 'Pizza', 'Hamburgers', 'Desserts', 'Beverages'];

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const items = await fetchAdminMenuItems();
        setMenuItems(items);
        setFilteredItems(items);
      } catch (error) {
        console.error('Failed to fetch menu items', error);
      }
    };

    getMenuItems();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === category));
    }
  };

  const handleShowModal = (item = {}) => {
    setEditMode(!!item.id);
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentItem({ id: '', name: '', description: '', img: '', price: '', category: '' });
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    try {
      if (editMode) {
        await updateMenuItem(currentItem.id, currentItem);
      } else {
        await createMenuItem(currentItem);
      }
  
      const items = await fetchAdminMenuItems();
      setMenuItems(items);
      handleCategoryFilter(selectedCategory);
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting menu item:', error);
      setErrorMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await deleteMenuItem(id);
        const items = await fetchAdminMenuItems();
        setMenuItems(items);
        handleCategoryFilter(selectedCategory);
      } catch (error) {
        console.error('Failed to delete menu item', error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="my-4">Admin Menu Management</h1>
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="primary" onClick={() => handleShowModal()}>
          Add Menu Item
        </Button>
        
        <Dropdown onSelect={handleCategoryFilter}>
          <Dropdown.Toggle variant="secondary">
            {selectedCategory}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {categories.map(category => (
              <Dropdown.Item key={category} eventKey={category}>
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

      <Table responsive hover className="mt-4 align-middle">
        <thead className="bg-light">
          <tr>
            <th className="text-center">#</th>
            <th>Name</th>
            <th>Description</th>
            <th className="text-center">Image</th>
            <th className="text-end">Price</th>
            <th>Category</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <td className="text-center">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
              <td className="fw-bold">{item.name}</td>
              <td>{item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description}</td>
              <td className="text-center">
                {item.img ? (
                  <ImagePreview src={item.img} alt={item.name} />
                ) : (
                  <span className="text-muted">No image</span>
                )}
              </td>
              <td className="text-end">{item.price}</td>
              <td>
                <Badge bg="secondary" pill>
                  {item.category}
                </Badge>
              </td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <Button variant="outline-warning" size="sm" onClick={() => handleShowModal(item)}>
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item.id)}>
                    <FaTrashAlt />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => (
            <li key={i + 1} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for adding/editing menu items */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{editMode ? 'Edit Menu Item' : 'Add Menu Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-3">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={currentItem.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter item name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPrice" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>Kr</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="price"
                      value={currentItem.price}
                      onChange={handleInputChange}
                      required
                      placeholder="0.00"
                      step="0.01"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentItem.description}
                onChange={handleInputChange}
                required
                placeholder="Enter item description"
              />
            </Form.Group>
            <Form.Group controlId="formImg" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={currentItem.img}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </Form.Group>
            <Form.Group controlId="formCategory" className="mb-4">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={currentItem.category}
                onChange={handleInputChange}
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {editMode ? 'Update' : 'Add'} Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminMenuPage;
