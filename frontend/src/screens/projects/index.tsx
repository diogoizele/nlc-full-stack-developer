import { FaPlus } from "react-icons/fa6";

import { useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { PageContainer } from "../../components/page-container";
import { ProjectList } from "../../components/project-list";
import { TextArea } from "../../components/text-area";

export const ProjectsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Projects</h2>
        <div className="flex items-center justify-between">
          <div className="w-1/2 max-w-prose">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onTextChange={setSearchQuery}
            />
          </div>

          <Button
            icon={<FaPlus />}
            fullWidth={false}
            onClick={() => setIsModalOpen(true)}
          >
            Add New
          </Button>
        </div>
        <div className="flex flex-wrap gap-8 mt-4">
          <ProjectList searchQuery={searchQuery} />
        </div>
      </div>
      <Modal
        title="Create new project"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <Input label="Name" placeholder="Enter project name.." />
          <TextArea label="Description" placeholder="Project Description" />

          <Button>Add Project</Button>
        </div>
      </Modal>
    </PageContainer>
  );
};
