import React, { useEffect, useState } from 'react';
import _, { isNumber } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { Select } from "baseui/select";
import { Input } from "baseui/input";
import { Button } from 'baseui/button';
import { Textarea } from 'baseui/textarea';
import { Cell, Grid } from 'baseui/layout-grid';
import { FileUploader } from "baseui/file-uploader";
import {
  Modal,
  ModalHeader,
  ModalBody,
  SIZE,
  ROLE
} from 'baseui/modal';

import Space from '../../Atoms/Space';
import DishApi from '../../api/dish';
import ImageUploader from '../../Molecule/ImageUploader';

const DishForm = ({
  dishId,
  isOpen,
  onClose,
  onSubmitForm
}) => {
  const { handleSubmit, control } = useForm();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [dish, setDish] = useState({});
  const [imageData, setImageData] = useState(null);
  const onSubmit = async (data) => {
    const { credId } = JSON.parse(localStorage.getItem('user'));
    const formData = {
      ...data,
      restId: credId,
      category: data.category.option.id,
      type: data.type.option.id
    };
    const fd = new FormData();

    for (const key in formData) {
      fd.append(key, formData[key]);
    }

    fd.append('image', imageData);

    console.log('----formdata----', fd);

    await DishApi.create(fd);
    // onClose();
    // onSubmitForm();
  }

  useEffect(() => {
    const getCategories = async () => {
      const data = await DishApi.getCategories();
  
      if (data && data.length > 0) {
        setCategories(data);
      }
    }

    getCategories();
  }, [])

  useEffect(() => {
    const getTypes = async () => {
      const data = await DishApi.getTypes();
  
      if (data && data.length > 0) {
        setTypes(data);
      }
    }

    getTypes();
  }, [])

  useEffect(() => {
    const getDish = async () => {
      const { credId } = JSON.parse(localStorage.getItem('user'));
      const data = await DishApi.getDish(credId, dishId);
  
      if (data) {
        setDish(data);
      }
    }

    if (isNumber(dishId)) {
      getDish();
    }
  }, [])

  const categoryMap = _.keyBy(categories, 'id');
  const typeMap = _.keyBy(types, 'id');

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: {
          style: {
            width: '80vw',
            // height: '80vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }
      }}
    >
      <ModalHeader>Dish Form</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Cell span={9}>
              <Grid>
                <Cell span={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Dish Name"
                        {...field}
                        value={field.value != undefined ? field.value : dish.name}
                      />
                    )}
                  />
                </Cell>
              </Grid>
              <Space />
              <Grid>
                <Cell span={12}>
                  <Controller
                    name="ingredients"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        placeholder="Ingredients"
                        {...field}
                        value={field.value != undefined ? field.value : dish.ingredients}
                      />
                    )}
                  />
                </Cell>
              </Grid>
              <Space />
              <Grid>
                <Cell span={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        placeholder="Restaurant Description"
                        {...field}
                        value={field.value != undefined ? field.value : dish.description}
                      />
                    )}
                  />
                </Cell>
              </Grid>
              <Space />
              <Grid>
                <Cell span={12}>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Price"
                        {...field}
                        value={field.value != undefined ? field.value : dish.price}
                      />
                    )}
                  />
                </Cell>
              </Grid>
              <Space />
              <Grid>
                <Cell span={12}>
                <Controller
                      name="category"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={categories.map(c => ({ id: c.id, label: c.name }))}
                          placeholder="Select Category"
                          value={
                            field.value != undefined
                              ? field.value.value :
                              [{ id: dish.category, label: categoryMap[dish.category] }]
                          }
                        />
                      )}
                    />
                </Cell>
              </Grid>
              <Space />
              <Grid>
                <Cell span={12}>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={types.map(t => ({ id: t.id, label: t.name }))}
                        placeholder="Select Type"
                        value={
                          field.value != undefined
                            ? field.value.value :
                            [{ id: dish.type, label: typeMap[dish.type]}]
                        }
                      />
                    )}
                  />
                </Cell>
              </Grid>
              <Space />
              <Grid>
            <Cell span={12}>
              <Button>Save Details</Button>
            </Cell>
          </Grid>
            </Cell>
            <Cell span={3}>
              <ImageUploader onUpload={data => setImageData(data)}/>
            </Cell>
          </Grid>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default DishForm;