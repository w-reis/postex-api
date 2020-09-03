import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCorrespondences1599174312445
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'correspondences',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },

          {
            name: 'recipient_name',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'recipient_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'object_number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'correspondences',
      new TableForeignKey({
        name: 'CorrespondenceRecipient',
        columnNames: ['recipient_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'recipients',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'correspondences',
      'CorrespondenceRecipient'
    );

    await queryRunner.dropTable('correspondences');
  }
}
