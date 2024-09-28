"use client";

import * as React from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { updateDocument } from "@/lib/actions/room.actions";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import Loader from "./loader";
import Header from "./header";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./activeCollaborators";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [documentTitle, setDocumentTitle] = React.useState(roomMetadata.title);

  const inputRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);

          if (updatedDocument) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [roomId, documentTitle]);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  ref={inputRef}
                  disabled={!editing}
                  value={documentTitle}
                  placeholder="Enter title"
                  onKeyDown={updateTitleHandler}
                  className="document-title-input"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                />
              ) : (
                <>
                  <p className="document-title">{documentTitle}</p>
                </>
              )}

              {currentUserType === "editor" && !editing && (
                <Image
                  alt="edit"
                  width={24}
                  height={24}
                  className="pointer"
                  src="/assets/icons/edit.svg"
                  onClick={() => setEditing(true)}
                />
              )}

              {currentUserType !== "editor" && !editing && (
                <p className="view-only-tag">View only</p>
              )}

              {loading && <p className="text-sm text-gray-400">Saving...</p>}
            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
