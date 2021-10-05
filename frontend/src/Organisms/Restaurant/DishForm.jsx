import React, { useEffect, useState } from 'react';
import _, { isNumber } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { Select } from "baseui/select";
import { Input } from "baseui/input";
import { Button } from 'baseui/button';
import { Textarea } from 'baseui/textarea';
import { Cell, Grid } from 'baseui/layout-grid';
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
import UploadApi from '../../api/upload';

const DishForm = ({
  dishId,
  isOpen,
  onClose,
  onSubmitForm
}) => {
  const { handleSubmit, reset, control } = useForm();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const onSubmit = async (data) => {
    const { credId } = JSON.parse(localStorage.getItem('user'));

    const reqData = {
      ...data,
      ingredients: data.ingredients,
      restId: credId,
      category: data.category.value[0].id,
      type: data.type.value[0].id,
      imageUrl
    };

    if (dishId && dishId != 'NEW') {
      await DishApi.update({...reqData, id: dishId});
    } else {
      await DishApi.create(reqData);
    }
    // onClose();
    onSubmitForm();
  }

  const onUploadImage = async (file) => {
    const url = await UploadApi.getUploadUrl();
    const res = await UploadApi.uploadImage(url.signedUrl, file);
    setImageUrl(url.signedUrl.split('?')[0]);
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
        const categoryMap = _.keyBy(categories, 'id');
        const typeMap = _.keyBy(types, 'id');
        setImageUrl(data.imageUrl);
        reset({
          name: data.name,
          ingredients: data.ingredients,
          description: data.description,
          price: data.price,
          category: {value: [{ id: data.category, label: categoryMap[data.category] }]},
          type: {value: [{ id: data.type, label: typeMap[data.type]}]}
        });
      }
    }

    if (isNumber(dishId)) {
      getDish();
    }
  }, [])

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
                          options={categories.map(c => ({ id: c.id, label: c.name }))}
                          placeholder="Select Category"
                          {...field}
                          value={field.value != undefined ? field.value.value : []}
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
                        options={types.map(t => ({ id: t.id, label: t.name }))}
                        placeholder="Select Type"
                        {...field}
                        value={field.value != undefined ? field.value.value : []}
                      />
                    )}
                  />
                </Cell>
              </Grid>
              <Space />
              <Grid>
            <Cell span={12}>
              <Button type="submit">Save Details</Button>
            </Cell>
          </Grid>
            </Cell>
            <Cell span={3}>
              <ImageUploader imageSrc={imageUrl} onUpload={onUploadImage}/>
            </Cell>
          </Grid>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default DishForm;