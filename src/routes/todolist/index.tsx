import { component$ } from '@builder.io/qwik';
import { type DocumentHead, loader$, action$, zod$, z, Form } from '@builder.io/qwik-city';

interface ListItem {
  text: string;
}

export const list: ListItem[] = [];

export const useListLoader = loader$(() => {
  return list;
});

export const useAddToListAction = action$(
  (item) => {
    list.push(item);
    return {
      success: true,
    };
  },
  zod$({
    text: z.string(),
  })
);

export default component$(() => {
  const list = useListLoader();
  const action = useAddToListAction();

  return (
    <>
      <h1>Form Action TODO list</h1>
      <ul>
        {list.value.map((item) => (
          <ItemComponent item={item} />
        ))}
      </ul>
      <Form action={action} spaReset>
        <input type="text" name="text" required />
        <button type="submit">Add item</button>
      </Form>
      <p>This little app works even when JavaScript is disabled.</p>
    </>
  );
});

const ItemComponent = component$((props: { item: { text: string } }) => {
  return <li>{props.item.text}</li>
})

export const head: DocumentHead = {
  title: 'Qwik To-Do',
};
