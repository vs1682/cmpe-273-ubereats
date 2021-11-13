import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import ImageUploader from '../../Molecule/ImageUploader';
import UploadApi from '../../api/upload';
import { fetchDish, createDish, updateDish } from '../../store/thunks/dish';

const DishForm = ({
  dishId,
  isOpen,
  onClose,
  onSubmitForm
}) => {
  const dispatch = useDispatch();
  const { handleSubmit, reset, control } = useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const restaurant = useSelector(state => state.restaurant);
  const categories = useSelector(state => state.dish.categories);
  const types = useSelector(state => state.dish.types);
  const dish = useSelector(state => state.dish.selected);

  const onSubmit = async (data) => {
    const reqData = {
      ...data,
      ingredients: data.ingredients,
      restId: restaurant.credId,
      category: data.category.value[0].id,
      type: data.type.value[0].id,
      imageUrl
    };

    if (dishId && dishId != 'NEW') {
      dispatch(updateDish({...reqData, id: dishId}));
    } else {
      dispatch(createDish(reqData));
    }
    onClose();
    onSubmitForm();
  }

  const onUploadImage = async (file) => {
    const url = await UploadApi.getUploadUrl();
    const res = await UploadApi.uploadImage(url.signedUrl, file);
    setImageUrl(url.signedUrl.split('?')[0]);
  }

  useEffect(() => {
    if (dishId && dishId !== 'NEW') {
      dispatch(fetchDish({ restId: restaurant.credId, dishId }));
    }
  }, [dishId]);

  useEffect(() => {
    if (dish) {
      const categoryMap = _.keyBy(categories, 'id');
      const typeMap = _.keyBy(types, 'id');

      setImageUrl(dish.imageUrl);
      
      reset({
        name: dish.name,
        ingredients: dish.ingredients,
        description: dish.description,
        price: dish.price,
        category: {value: [{ id: dish.category, label: categoryMap[dish.category] }]},
        type: {value: [{ id: dish.type, label: typeMap[dish.type]}]}
      });
    }
  }, [dish])

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
                        placeholder="Description"
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