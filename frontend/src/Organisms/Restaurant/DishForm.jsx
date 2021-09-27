import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select } from "baseui/select";
import { Input } from "baseui/input";
import { Button, KIND as ButtonKind } from 'baseui/button';
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

const DishForm = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const { handleSubmit, control } = useForm();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  // const onSubmit = async (data) => {
  //   // const restaurant = JSON.parse(localStorage.getItem('user'));
  //   // const profile = await RestaurantApi.updateProfile({
  //   //   ...restaurant, ..._.omitBy(data, v => !v)
  //   // });

  //   // if (profile) {
  //   //   history.push('/restaurant');
  //   // }
  // }

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

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Dish Form</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Cell span={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => <Input placeholder="Dish Name" {...field} />}
              />
            </Cell>
          </Grid>
          <Space />
          <Grid>
            <Cell span={12}>
              <Controller
                name="ingredients"
                control={control}
                defaultValue=""
                render={({ field }) => <Textarea placeholder="Ingredients" {...field} />}
              />
            </Cell>
          </Grid>
          <Space />
          <Grid>
            <Cell span={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Textarea placeholder="Restaurant Description" {...field} />}
              />
            </Cell>
          </Grid>
          <Space />
          <Grid>
            <Cell span={12}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => <Input placeholder="Price" {...field} />}
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
        </form>
      </ModalBody>
    </Modal>
  );
}

export default DishForm;