import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown, Button, Form, FormCheck } from "react-bootstrap";
import { Tags, Plus } from "react-bootstrap-icons";
import { API_URL } from "../../hooks/useGlobalContext";
import { useParams } from 'react-router-dom';
type Props = {
  tagsRequestURL: string;
};

type TagsData = {
  id: number,
  content: string,
  color: string,
};

export type { TagsData };

type LabelProps = {
  content: React.ReactNode;
  color: string,
};

type TagProps = {
  content: React.ReactNode;
  color: string,
  dropdownmenu: React.ReactNode
};

type TagDropdownMenuProps = {
  tagsRequestURL: string,
  tags: TagsData[],
  setTags: React.Dispatch<React.SetStateAction<TagsData[]>>,
};

const TagDropdownMenu = ({ tags, setTags, tagsRequestURL }: TagDropdownMenuProps) => {
  const [labels, setLabels] = useState<TagsData[]>([]);
  const { boardID } = useParams();
  const [disableCheckbox, setDisableCheckbox] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#61bd4f");
  const [labelName, setLabelName] = useState("");

  const colors = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46", "#c377e0",
    "#0079bf", "#00c2e0", "#51e898", "#ff78cb", "#344563"];

  const getLabels = async () => {
    await axios.get(`${API_URL}/board/${boardID}/labels`)
      .then(r => {
        const { data } = r;
        const filteredLabels = tags.filter(
          e => data.some(
            (k: TagsData) => e.color === k.color && e.content === k.content
          )
        );
        setLabels(filteredLabels);
      })
      .catch(e => console.log(e));
  };
  useEffect(() => {
    getLabels();
  }, []);

  const submitNewLabel = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const body = { content: labelName, color: selectedColor };
    setLabelName("");
    setSelectedColor("#61bd4f");
    await axios.post(tagsRequestURL, body)
      .then(r => {
        const { data } = r;
        setLabels([...labels, data]);
        setTags([...tags, data]);
      })
      .catch(e => console.log(e));
  };


  const LabelElem = ({ content, color, id }: TagsData) => {
    const onCheckClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(content, color, id)
      setDisableCheckbox(true);
      const body = { id: id, content: content, color: color };
      if (e.target.checked) {
        await axios.post(`${tagsRequestURL}`, body)
          .then(() => setTags([...tags, body]))
          .catch(e => console.log(e))
          .finally(() => setDisableCheckbox(false));
      }
      else {
        await axios.delete(`${tagsRequestURL}/${id}`)
          .then(() => setTags(tags.filter(e => e.id !== id)))
          .catch(e => console.log(e))
          .finally(() => setDisableCheckbox(false));
      }
    }

    return <div className="flex flex-row gap-2 items-center">
      <Button className="w-[100%]"
        style={{
          backgroundColor: color,
          borderColor: color,
          textAlign: 'left'
        }}
      >{content}</Button>
      <FormCheck
        disabled={disableCheckbox}
        defaultChecked={tags.some(el => el.color === color && el.content === content)}
        onChange={onCheckClick}
      ></FormCheck>
    </div>
  };

  return (
    <Dropdown.Menu className="w-[304px]">
      <Dropdown.Header className="text-center">Labels</Dropdown.Header>
      <Dropdown.Divider />
      <div className="mx-2">
        <div className="flex flex-col gap-2">
          {labels.map((label, index) =>
            <LabelElem
              key={`${index}`}
              id={label.id}
              content={label.content}
              color={label.color}
            />)}
        </div>
        <Dropdown.Divider />
        <Dropdown.Header className="text-center">Create a new label</Dropdown.Header>

        <Form className="flex flex-col" onSubmit={submitNewLabel}>
          <Form.Label className="text-[#5e6c84] font-bold text-xs">Name</Form.Label>
          <Form.Control type="text" placeholder="" value={labelName} onChange={e => setLabelName(e.target.value)} />
          <Form.Label className="text-[#5e6c84] font-bold text-xs mt-2">Select a color</Form.Label>
          <div className="flex flex-row flex-wrap gap-2 items-center justify-center mb-2">
            {colors.map((color, idx) =>
              <div
                key={color}
                className="w-12 h-8 rounded-md" style={{ backgroundColor: color }}>
                <input
                  value={color}
                  type="radio"
                  name="color"
                  defaultChecked={idx === 0}
                  onChange={e => setSelectedColor(e.target.value)}
                  className="flex justify-center h-8 m-auto"
                />
              </div>
            )}
          </div>
          <Button type="submit" disabled={!labelName}>
            Create
          </Button>
        </Form>
      </div>
    </Dropdown.Menu >
  );
};

const Tag = ({ content, color, dropdownmenu }: TagProps) => {
  return (
    <Dropdown autoClose="outside" >
      <Dropdown.Toggle id="dropdown-autoclose-outside" className="hover:opacity-50"
        style={{ backgroundColor: color, borderColor: color, boxShadow: 'none' }}
      >
        <span className="font-bold">{content}</span>
      </Dropdown.Toggle>
      {dropdownmenu}
    </Dropdown  >
  );
}

const CardTags = ({ tagsRequestURL }: Props) => {
  const [tags, setTags] = useState<TagsData[]>([]);
  const [loaded, setLoaded] = useState(false);
  const getTags = async () => {
    await axios.get(tagsRequestURL)
      .then(r => {
        const { data } = r;
        setTags(data);
        setLoaded(true);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    getTags();
  }, []);

  const dropdownMenu = <TagDropdownMenu setTags={setTags} tags={tags} tagsRequestURL={tagsRequestURL} />;

  return (
    <div className="w-[100%]">
      <div className="flex flex-row items-center text-xl h-[44px]">
        <Tags width={24} height={24} />
        <span>Labels</span>
      </div>
      <div className="flex flex-row gap-2 flex-wrap items-center text-xl">
        {loaded && tags.map(
          tag =>
            <Tag
              dropdownmenu={dropdownMenu}
              content={tag.content}
              color={tag.color}
              key={tag.id}
            />
        )}
        {loaded &&
          <Tag
            dropdownmenu={dropdownMenu}
            color="#f8f9fa"
            content={<Plus height={24} width={24} color="#000" />}
          />}
      </div>
    </div >
  )
};

export default CardTags;