class AddTags < ActiveRecord::Migration

  def up
    create_table :tags do |t|
      t.integer :user_id
      t.integer :question_id
      t.integer :topic_id
      t.timestamps
    end
    add_index :tags, :user_id
    add_index :tags, :question_id
    add_index :tags, :topic_id
  end

  def down
    if table_exists?(:tags)
      remove_index :tags, :user_id if index_exists? :tags, :user_id
      remove_index :tags, :question_id if index_exists? :tags, :question_id
      remove_index :tags, :topic_id if index_exists? :tags, :topic_id
      drop_table :tags
    end

  end

end
